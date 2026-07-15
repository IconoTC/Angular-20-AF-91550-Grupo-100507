import { Component, signal } from '@angular/core';

@Component({
  selector: 'ind-home-page',
  imports: [],
  template: ` <h2>{{ title() }}</h2> `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class HomePage {
  protected readonly title = signal('Home').asReadonly();
}
