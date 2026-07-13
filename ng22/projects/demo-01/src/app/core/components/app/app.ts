import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet],
  template: `
    <header>
      <h1>{{ title() }}</h1>
    </header>
    <main class="container">
      <router-outlet />
      <p>Este es un proyecto de demostración de Angular 22</p>
    </main>
    <footer>footer</footer>
  `,
  styles: `
  :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
 
  `,
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
}
