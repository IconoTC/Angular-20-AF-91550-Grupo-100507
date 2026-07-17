import { Component, inject, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Time } from '../../core/services/time';
import { CoursesList } from './components/courses-list/courses-list';

@Component({
  selector: 'ind-courses-page',
  imports: [CoursesList, Card],
  template: `
    <h2>{{ title() }}</h2>

    <ind-card>
      <!-- <ind-course-item-pro /> -->
      <ind-courses-list />
    </ind-card>
    <p>TimeStamp: {{ ts.getTime() }}</p>
  `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class CoursesPage {
  protected readonly title = signal('Cursos').asReadonly();
  protected readonly ts = inject(Time);
}
