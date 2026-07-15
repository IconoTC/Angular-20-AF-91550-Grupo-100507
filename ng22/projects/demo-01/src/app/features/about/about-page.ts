import { Component, inject, signal } from '@angular/core';
import { Time } from '../../core/services/time';

@Component({
  selector: 'ind-about-page',
  imports: [],
  providers: [
    // {
    //   provide: Time,
    //   useClass: Time
    // }
    Time,
  ],
  template: ` 
    <h2>{{ title() }}</h2> 
    <p>TimeStamp: {{ ts.getTime() }}</p> `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class AboutPage {
  protected readonly title = signal('About').asReadonly();

  protected readonly ts = inject(Time)
}
