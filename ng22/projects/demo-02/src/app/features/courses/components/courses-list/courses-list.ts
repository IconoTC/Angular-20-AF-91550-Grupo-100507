import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Filter } from '../filter/filter';
import { CourseItem } from '../course-item/course-item';
import { CourseForm } from '../course-form/course-form';
import { Course } from '../../types/course';
import { JsonPipe } from '@angular/common';
import { Card } from '../../../../core/components/card/card';
import { CoursesApiRepo } from '../../services/courses.api.repo';
import { RepoRx } from '../../../../core/types/repo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ind-courses-list',
  imports: [Filter, CourseItem, CourseForm, JsonPipe, Card],
  template: `
    <ind-filter />
    <details #addCourseDetail>
      <summary>Añadir curso</summary>
      <ind-course-form (eventCreate)="createCourse($event)" />
    </details>
    @if (isLoading()) {
      <p>Loading courses...</p>
    } @else if (error()) {
      <p>{{ error() }}</p>
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

        <!-- @let coursesList = courses$ | async;

          @for (item of coursesList; track item.id) {
          <li>
            <ind-card>
              <ind-course-item
                [course]="item"
                (eventDelete)="deleteCourse($event)"
                (eventChange)="updateCourse($event)"
              />
            </ind-card>
          </li>
          }  -->
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
  readonly #repo: RepoRx<Course> = inject(CoursesApiRepo);
  private readonly addCourseDetail = viewChild<ElementRef<HTMLDetailsElement>>('addCourseDetail');
  protected readonly courses = signal<Course[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly isLoading = signal<boolean>(false);

  constructor() {
    this.loadCoursesRx();
  }

  #manageError(error: Error) {
    console.log(error);
    if (!(error instanceof HttpErrorResponse)) {
      error = new Error('Unknown error occurred.');
    }
    this.error.set(error.message);
  }

  loadCoursesRx() {
    this.isLoading.set(true);

    this.#repo.getAll().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.error.set(null);
        this.isLoading.set(false);
      },
      error: this.#manageError,
      complete: () => {
        console.log('Courses loading completed.');
      },
    });
  }

  deleteCourse(courseId: Course['id']) {
    this.#repo.delete(courseId).subscribe({
      next: () => {
        const updatedCourses = this.courses().filter((course) => course.id !== courseId);
        this.courses.set(updatedCourses);
      },
      error: this.#manageError,
    });
  }

  updateCourse(updatedCourse: Course) {
    this.#repo.update(updatedCourse.id, updatedCourse).subscribe({
      next: (updatedCourse) => {
        const updatedCourses = this.courses().map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course,
        );
        this.courses.set(updatedCourses);
      },
      error: this.#manageError,
      complete: () => {
        console.log('Course update completed.');
        this.error.set(null);
      },
    });
  }

  #closeDetail() {
    const detail = this.addCourseDetail()?.nativeElement;
    if (detail) {
      detail.open = false;
    }
  }

  createCourse(courseData: Omit<Course, 'id'>) {
    // Asíncrona -> repo
    this.#repo.create(courseData).subscribe(
      //  Sincrona -> estado
      {
        next: (newCourse) => {
          const updatedCourses = [newCourse, ...this.courses()];
          this.courses.set(updatedCourses);
          this.#closeDetail();
        },
        error: this.#manageError,
        complete: () => {
          console.log('Course creation completed.');
          this.error.set(null);
        },
      },
    );
  }
}
