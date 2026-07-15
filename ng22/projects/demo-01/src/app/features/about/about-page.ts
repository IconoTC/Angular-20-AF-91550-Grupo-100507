import { Component, signal } from '@angular/core';

@Component({
  selector: 'ind-about-page',
  imports: [],
  template: ` <h2>{{ title() }}</h2> `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class AboutPage {
  protected readonly title = signal('About').asReadonly();
}
