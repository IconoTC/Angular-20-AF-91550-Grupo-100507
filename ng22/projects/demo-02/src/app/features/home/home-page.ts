import { Component, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Info } from './components/info/info';

@Component({
  selector: 'ind-home-page',
  imports: [Info, Card],
  template: ` <h2>{{ title() }}</h2>
    <ind-card>
      <ind-info />
    </ind-card>`,
  styles: ``,
  styleUrls: ['../pages.css'],
})
export default class HomePage {
  protected readonly title = signal('Home').asReadonly();
}
