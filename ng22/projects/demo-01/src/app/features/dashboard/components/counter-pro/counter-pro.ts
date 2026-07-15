import { Component, input, output, signal } from '@angular/core';
import { CounterState } from '../../types/counter-state';

const LIMIT = 5;

@Component({
  selector: 'ind-counter-pro',
  imports: [],
  template: `
    <h3>Counter ID: {{ id() }}</h3>
    <p>
      Clicks: <output>{{ clicks() }}</output>
    </p>
    <!-- <p>Count: <output [class]="count() < 0 ? 'negative': ''">{{ count() }}</output></p> -->
    <!-- <p>Count: <output [class]='{negative: count() < 0}'>{{ count() }}</output></p> -->
    <p>
      Count: <output [class.negative]="count() < 0">{{ count() }}</output>
    </p>
    <div>
      <button (click)="changeCount(1)" title="Increment" [disabled]="count() >= limit()">➕</button>
      <button (click)="changeCount(-1)" title="Decrement" [disabled]="count() <= -limit()">
        ➖
      </button>
      <button (click)="resetCount()" title="Reset" [disabled]="count() === 0">🟣</button>
    </div>
    @if (count() >= limit()) {
      <p class="limit-reached">Limite superior alcanzado</p>
    } @else if (count() <= -limit()) {
      <p class="limit-reached">Limite inferior alcanzado</p>
    } @else {
      <p class="limit-reached">&nbsp;</p>
    } 

  `,
  styles: `
    div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .limit-reached {
      padding-top: 0.5rem;
      color: var(--color-primary-hot);
      min-width: 13rem
    }

    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
})
export class CounterPro {
  readonly id = input.required<number>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'counter-id',
  });

  // @Output() protected readonly countChange = new EventEmitter<CounterState>();
  protected readonly countChange = output<CounterState>();

  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  protected readonly limit = signal(LIMIT);

  protected changeCount(value: number): void {
    this.count.set(this.count() + value);
    this.clicks.set(this.clicks() + 1);
    this.countChange.emit({ id: this.id(), clicks: this.clicks(), value: this.count() });
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);
    this.countChange.emit({ id: this.id(), clicks: this.clicks(), value: this.count() });
  }
}
