import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet],
  template: `
    <h1>{{ title() }}</h1>
    <p>Aprendiendo Angular Moderno</p>
    <router-outlet />
  `,
  styles: `
    h1 {color: #369; font-family: Lato, sans-serif; font-weight: 300;}
  `,
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
}
