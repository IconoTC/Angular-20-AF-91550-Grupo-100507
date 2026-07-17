import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Filter } from '../filter/filter';
import { CourseItem } from '../course-item/course-item';
import { CourseForm } from '../course-form/course-form';
import { Course } from '../../types/course';
import { getMockCoursesAsync, getMockCoursesRx } from '../../data/courses';
import { JsonPipe } from '@angular/common';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'ind-courses-list',
  imports: [Filter, CourseItem, CourseForm, JsonPipe, Card],
  template: `
    <ind-filter />
    <details #addCourseDetail>
      <summary>Añadir curso</summary>
      <ind-course-form (eventCreate)="createCourse($event)"/>
    </details>
    @if (isLoading()) {
      <p>Loading courses...</p>
    } @else if (error()) {
      <p>Error loading courses: {{ error() }}</p>
    } @else {
      <ul>
        @for (item of courses(); track item.id) {
          <li>
            <ind-card>
              <ind-course-item
                [course]="item"
                (eventDelete)="deleteCourse($event)"
                (eventChange)="updateCourse($event)"
              />
            </ind-card>
          </li>
        }
      </ul>
    }

    <pre>{{ courses() | json }}</pre>
    <pre>{{ error() | json }}</pre>
    <pre>{{ isLoading() | json }}</pre>
  `,
  styles: `
    details {
      margin-block: 1rem;
      summary::marker {
        color: var(--color-primary);
      }
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
})
export class CoursesList {
  protected readonly courses = signal<Course[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly isLoading = signal<boolean>(false);
  private readonly addCourseDetail = viewChild<ElementRef<HTMLDetailsElement>>('addCourseDetail') 

  constructor() {
    this.loadCoursesRx();
  }

  // async #loadCourses() {
  //   const courses = await getMockCoursesAsync();
  //   this.courses.set(courses);
  // }

  loadCourses() {
    this.isLoading.set(true);
    getMockCoursesAsync()
      .then((courses) => {
        this.courses.set(courses);
        this.error.set(null);
      })
      .catch((error: Error) => {
        this.error.set(error.message);
        console.error('Error loading courses:', error);
      })
      .finally(() => {
        this.isLoading.set(false);
        console.log('Courses loading completed.');
      });
  }

  loadCoursesRx() {
    this.isLoading.set(true);
    getMockCoursesRx().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.error.set(null);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        //if (!(error instanceof Error)) {
        error = new Error('Unknown error occurred while loading courses.');
        //}
        this.error.set(error.message);
        this.isLoading.set(false);
        console.error('Error loading courses:', error);
      },
      complete: () => {
        console.log('Courses loading completed.');
      },
    });
  }

  deleteCourse(courseId: Course['id']) {
    const updatedCourses = this.courses().filter((course) => course.id !== courseId);
    this.courses.set(updatedCourses);
  }

  updateCourse(updatedCourse: Course) {
    const updatedCourses = this.courses().map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course,
    );
    this.courses.set(updatedCourses);
  }

  private closeDetail () {
    const detail = this.addCourseDetail()?.nativeElement;
    if (detail) {
      detail.open = false;
    }
  }

  createCourse(courseData: Omit<Course, 'id'>) {
    const newCourse: Course = {
      ...courseData,
      id: this.courses().length > 0 ? Math.max(...this.courses().map((c) => c.id)) + 1 : 1,
    };
    const updatedCourses = [newCourse, ...this.courses()];
    this.courses.set(updatedCourses);
    this.closeDetail();
  }
}
