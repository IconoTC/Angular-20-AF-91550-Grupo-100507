import { Component, signal } from '@angular/core';
import { CountersList } from './components/counters-list/counters-list';

@Component({
  selector: 'ind-dashboard-page',
  imports: [CountersList],
  template: ` 
    <h2>{{ title() }}</h2> 
    <ind-counters-list />
  `,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class DashboardPage {
  protected readonly title = signal('Dashboard').asReadonly();
}
