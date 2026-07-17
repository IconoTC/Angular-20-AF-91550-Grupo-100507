import { Component } from '@angular/core';

@Component({
  selector: 'ind-card',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styles: `
      :host {
      display: block;
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 8px;
      box-shadow: 2px 2px 6px color-mix(in srgb, var(--color-text) 20%, transparent);
      text-align: center;
    }`,
})
export class Card {}
