import { Component, signal } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

@Component({
  selector: 'ind-course-item-signals',
  imports: [],
  template: `
    <h3 [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
    <p>Descripción: {{ course().description }}</p>
    <p>{{ plainMessage }}</p>
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
  `,
})
export class CourseItemSignals {
  protected plainMessage = 'Este es un mensaje plano';
  protected readonly course = signal<Course>(COURSES[0]);

  constructor() {
    setTimeout(() => {
      this.plainMessage = 'Mensaje actualizado después de 2 seg';
      console.log(this.plainMessage);
    }, 2000);

    setTimeout(() => {
      this.course().title = 'Curso de Angular 22 - Actualizado';
      console.log(this.course().title);
    }, 4000);

    setTimeout(() => {
      this.course.update((course) => ({
        ...course,
        description: 'Curso de Angular 22 - Actualizado con update()'
      }));
      console.log(this.course().description);
    }, 6000);
  }
}
