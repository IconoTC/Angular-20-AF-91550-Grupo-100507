import { Component, computed, signal } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

@Component({
  selector: 'ind-course-item-pro',
  imports: [],
  template: `
    <header>
      <img [src]="course().image" [alt]="" />
      <h3 [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
    </header>
    <section class="details">
      <p>{{ course().description }}</p>
      <p>Duración: {{ course().duration }}</p>
      <p>Nivel: {{ course().level }}</p>
    </section>
    <section class="stats">
      <div class="course-stats" aria-label="Utilidad">
        <span
          >Utilidad: <output>{{ course().courseStats.utility }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.utility === STAT_MIN"
            (click)="changeStats('utility', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.utility === STAT_MAX"
            (click)="changeStats('utility')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.utility === 0"
            [title]="'Reset ' + 'utilidad' + ' a 0'"
            (click)="changeStats('utility', 0)"
          >
            🔄️
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Dificultad">
        <span
          >Dificultad: <output>{{ course().courseStats.difficulty }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.difficulty === STAT_MIN"
            (click)="changeStatsFull('difficulty', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.difficulty === STAT_MAX"
            (click)="changeStatsFull('difficulty')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.difficulty === 0"
            (click)="changeStatsFull('difficulty', 0)"
            [title]="'Reset ' + 'difficulty' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Actualidad">
        <span
          >Actualidad: <output>{{ course().courseStats.actualization }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.actualization === STAT_MIN"
            (click)="changeStatsFull('actualization', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.actualization === STAT_MAX"
            (click)="changeStatsFull('actualization')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.actualization === 0"
            (click)="changeStatsFull('actualization', 0)"
            [title]="'Reset ' + 'actualidad' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
    </section>
    <div class="course-stats average" aria-label="Rating">
      <span>
        Rating (Average):
        <output>
          {{ averageRate().toFixed(2) }}
        </output>
      </span>
      <div class="course-courseStats-buttons">
        <button
          (click)="resetStatsAll()"
          [title]="'Reset todo a 0'"
        >
          🔄
        </button>
      </div>
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
    .details {
      text-align: center;
    }

    .course-title {
      font-weight: bolder;
      font-size: 1.4rem;
      margin-block: 0.5rem;
      text-align: center;
    }

    .course-stats {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;

      .course-courseStats-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }

    .average {
      margin-block-start: 0.5rem;
      padding-block-start: 0.5rem;
      border-top: 1px solid var(--color-primary);
    }

    /* clase de aplicación opcional */
    .course-advanced {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
  `,
})
export class CourseItemPro {
  protected readonly STAT_MIN = 0;
  protected readonly STAT_MAX = 10;
  protected readonly course = signal<Course>(COURSES[0]);
  protected readonly averageRate = computed<number>(() => {
    const stats = this.course().courseStats;
    const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
    return total / Object.keys(stats).length;
  });

  // Método incorrecto
  // Se mantiene para ver su efecto en la signal computed
  protected changeStats(stat: keyof Course['courseStats'], delta = 1): void {
    const value = this.course().courseStats[stat];

    if (delta === 0) {
      this.course().courseStats[stat] = 0;
      return;
    }

    if ((delta === 1 && value < this.STAT_MAX) || (delta === -1 && value > this.STAT_MIN)) {
      this.course().courseStats[stat] += delta;
    }
  }

  protected changeStatsFull(stat: keyof Course['courseStats'], delta = 1): void {
    const value = this.course().courseStats[stat];
    const newValue = delta === 0 ? 0 : value + delta;

    if (
      delta === 0 ||
      (delta === 1 && value < this.STAT_MAX) ||
      (delta === -1 && value > this.STAT_MIN)
    ) {
      this.course.update((course) => {
        return {
          ...course,
          courseStats: {
            ...course.courseStats,
            [stat]: newValue,
          },
        };
      });
    }
  }

  protected resetStatsAll(): void {
    this.course.update((course) => {
      return {
        ...course,
        courseStats: {
          utility: 0,
          difficulty: 0,
          actualization: 0,
        },
      };
    });
  }
}
