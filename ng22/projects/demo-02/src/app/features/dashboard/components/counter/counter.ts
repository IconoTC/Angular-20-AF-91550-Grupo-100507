import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ind-counter',
  imports: [],
  template: `
    <h3>Counter ID: {{ id() }}</h3>
    <p>Clicks: {{ clicks() }}</p>
    <p>Count: {{ count() }}</p>
    <div>
      <button (click)="changeCount(1)" title="Increment">➕</button>
      <button (click)="changeCount(-1)" title="Decrement">➖</button>
      <button (click)="resetCount()" title="Reset">🟣</button>
    </div>
  `,
  styles: `
      div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  `,
})
export class Counter {
  readonly id = input.required<number>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'counter-id',
  });

  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  protected changeCount(value: number): void {
    this.count.set(this.count() + value);
    this.clicks.set(this.clicks() + 1);
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);
  }
}
