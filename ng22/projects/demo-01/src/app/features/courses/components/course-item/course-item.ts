import { Component, input, output } from '@angular/core';
import { Course } from '../../types/course';

@Component({
  selector: 'ind-course-item',
  imports: [],
  template: `
    <header>
      <img [src]="course().image" [alt]="" width="150" height="100" />
      <h3
        [title]="'Curso ID: ' + course().id"
        [class.course-advanced]="course().level === 'advanced'"
      >
        {{ course().title }}
      </h3>
    </header>
    <section class="details">
      <p>Duración: {{ course().duration }}</p>
      <p>Nivel: {{ course().level }}</p>
      <label class="form-control checkbox" for="officialCourse">
        <input type="checkbox" id="officialCourse" name="officialCourse" 
        [checked]="course().isOfficial" (change)="emitChange()"  />
        <span>Curso oficial</span>
      </label>
    </section>
    <div>
      <button (click)="emitDelete()">Eliminar</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
    }
    h3 {
      padding: 0.5rem;
    }
    img {
      width: 100%;
      max-width: 150px;
      border-radius: 4px;
    }
    .details {
      text-align: center;
    }

    .course-title {
      font-weight: bolder;
      font-size: 1.4rem;
      margin-block: 0.5rem;
      text-align: center;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: var(--color-primary);
      color: white;
      cursor: pointer;
      &:hover {
        background-color: var(--color-primary-hot);
      }
      &.selected {
        background-color: var(--color-primary-hot);
        outline: 2px solid var(--color-secondary);
      }
    }
    /* clase de aplicación opcional */
    .course-advanced {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
    .form-control {
      margin-block: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &.checkbox {
        flex-direction: row;
        align-items: center;
      }
    }
  `,
})
export class CourseItem {
  readonly course = input.required<Course>();
  readonly eventDelete = output<Course['id']>();
  readonly eventChange = output<Course>();

  protected emitDelete() {
    this.eventDelete.emit(this.course().id);
  }

  emitChange() {
    const updatedCourse: Course = {
      ...this.course(),
      isOfficial: !this.course().isOfficial,
    };
    this.eventChange.emit(updatedCourse);
  }
}
