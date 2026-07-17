import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Filter } from '../filter/filter';
import { CourseItem } from '../course-item/course-item';
import { CourseForm } from '../course-form/course-form';
import { JsonPipe } from '@angular/common';
import { Card } from '../../../../core/components/card/card';
import { Store } from '../../services/store';

@Component({
  selector: 'ind-courses-list',
  imports: [Filter, CourseItem, CourseForm, JsonPipe, Card],
  template: `
    <ind-filter />
    <details #addCourseDetail>
      <summary>Añadir curso</summary>
      <ind-course-form (eventCreate)="closeDetail()" />
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
  private readonly addCourseDetail = viewChild<ElementRef<HTMLDetailsElement>>('addCourseDetail');
  
  readonly #store = inject(Store);
  protected readonly courses = this.#store.state.courses;
  protected readonly error = this.#store.state.error;
  protected readonly isLoading = this.#store.state.isLoading;

  protected closeDetail() {
    const detail = this.addCourseDetail()?.nativeElement;
    if (detail) {
      detail.open = false;
    }
  }

}
