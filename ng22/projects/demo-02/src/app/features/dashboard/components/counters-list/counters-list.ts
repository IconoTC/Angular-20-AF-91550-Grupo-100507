import { Component, computed, signal } from '@angular/core';
import { Card } from '../../../../core/components/card/card';
import { CounterPro } from '../counter-pro/counter-pro';
import { CounterState } from '../../types/counter-state';

const COUNTERS: CounterState[] = [
    { id: 17, clicks: 0,  value: 0 },
    { id: 23, clicks: 0, value: 0 },
    { id: 53, clicks: 0, value: 0 }
  ]


@Component({
  selector: 'ind-counters-list',
  imports: [CounterPro, Card],
  template: `
    <p>Total clicks: {{ totalClicks() }}</p>
    <p>Total count: {{ totalCount() }}</p>
    <div class="counters-container">
      @for (counter of counters(); track counter.id) {
        <ind-card>
          <ind-counter-pro [counter-id]="counter.id" (countChange)="updateState($event)" />
        </ind-card>
      }
    </div>
  `,
  styles: `
    .counters-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  `,
})
export class CountersList {
  protected readonly counters = signal<CounterState[]>(COUNTERS);

  protected readonly totalClicks = computed(() => this.counters().reduce((acc, counter) => acc + counter.clicks, 0));
  protected readonly totalCount = computed(() => this.counters().reduce((acc, counter) => acc + counter.value, 0));

  updateState(newState: CounterState): void {
    const updatedCounters = this.counters().map(counter => {
      if (counter.id === newState.id) {
        return { ... newState };
      }
      return counter;
    });
    this.counters.set(updatedCounters);
  }
}
