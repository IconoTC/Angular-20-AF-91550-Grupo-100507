import { Component, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { CourseItemPro } from './components/course-item-pro/course-item-pro';
import { CourseItemSignals } from './components/course-item-signals/course-item-signals';
import { CourseItem } from './components/course-item/course-item';
import { Filter } from './components/filter/filter';

@Component({
  selector: 'ind-courses-page',
  imports: [Filter, CourseItem, CourseItemSignals, CourseItemPro, Card],
  template: ` <h2>{{ title() }}</h2>
    <ind-filter />
    <ind-card>
      <ind-course-item-pro />
    </ind-card>
    <details>
      <summary>Componentes de ejemplo previos</summary>
      <ind-course-item />
      <ind-course-item-signals />
    </details>`,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class CoursesPage {
  protected readonly title = signal('Cursos').asReadonly();
}
