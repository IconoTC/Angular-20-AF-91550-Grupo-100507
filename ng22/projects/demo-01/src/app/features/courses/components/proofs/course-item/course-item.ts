import { Component, signal } from '@angular/core';
import { COURSES } from '../../../data/courses';
import { Course } from '../../../types/course';

@Component({
  selector: 'ind-course-item',
  imports: [],
  template: `
    <img [src]="course().image" [alt]="" />
    <h3 [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
    <p>{{ course().description }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }
    p {
      color: var(--color-primary);
    }
  `,
})
export class CourseItem {
  protected readonly course = signal<Course>(COURSES[0]);
}
