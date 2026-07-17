import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Course } from '../types/course';
import { CoursesApiRepo } from './courses.api.repo';
import { RepoRx } from '../../../core/types/repo';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class Store {
  readonly #repo: RepoRx<Course> = inject(CoursesApiRepo);
  readonly #courses = signal<Course[]>([]);
  readonly #error = signal<string | null>(null);
  readonly #isLoading = signal<boolean>(false);
  readonly #destroyRef = inject(DestroyRef);

  readonly state = {
    courses: this.#courses.asReadonly(),
    error: this.#error.asReadonly(),
    isLoading: this.#isLoading.asReadonly(),
  };

  #manageError(error: Error) {
    console.log(error);
    if (!(error instanceof HttpErrorResponse)) {
      error = new Error('Unknown error occurred.');
    }
    this.#error.set(error.message);
  }

  loadCourses() {
    this.#isLoading.set(true);

    this.#repo.getAll().pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (courses) => {
        this.#courses.set(courses);
        this.#error.set(null);
        this.#isLoading.set(false);
      },
      error: this.#manageError,
      complete: () => {
        console.log('Courses loading completed.');
      },
    });
  }

  createCourse(courseData: Omit<Course, 'id'>) {
    this.#repo.create(courseData).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(
      //  Sincrona -> estado
      {
        next: (newCourse) => {
          const updatedCourses = [newCourse, ...this.#courses()];
          this.#courses.set(updatedCourses);
        },
        error: this.#manageError,
        complete: () => {
          console.log('Course creation completed.');
          this.#error.set(null);
        },
      },
    );
  }

  updateCourse(updatedCourse: Course) {
    this.#repo.update(updatedCourse.id, updatedCourse).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (updatedCourse) => {
        const updatedCourses = this.#courses().map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course,
        );
        this.#courses.set(updatedCourses);
      },
      error: this.#manageError,
      complete: () => {
        console.log('Course update completed.');
        this.#error.set(null);
      },
    });
  }

  deleteCourse(courseId: Course['id']) {
    this.#repo.delete(courseId).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: () => {
        const updatedCourses = this.#courses().filter((course) => course.id !== courseId);
        this.#courses.set(updatedCourses);
      },
      error: this.#manageError,
    });
  }
}
