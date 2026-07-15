import { Component, inject, signal } from '@angular/core';
import { CountersList } from './components/counters-list/counters-list';
import { Time } from '../../core/services/time';

@Component({
  selector: 'ind-dashboard-page',
  imports: [CountersList],
  template: ` 
    <h2>{{ title() }}</h2> 
    <ind-counters-list />
    <p>TimeStamp: {{ ts.getTime() }}</p>
  `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class DashboardPage {
  protected readonly title = signal('Dashboard').asReadonly();
  protected readonly ts = inject(Time)
}
