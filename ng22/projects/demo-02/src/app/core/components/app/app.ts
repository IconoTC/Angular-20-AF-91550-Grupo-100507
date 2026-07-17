import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import { Socials } from '../socials/socials';
import { MenuOption } from '../../types/menu-option';
import { getMenuItems } from '../../../app.routes';
import { Store } from '../../../features/courses/services/store';

@Component({
  selector: 'ind-root',
  imports: [
    RouterOutlet,
    LogoCoders,
    Menu,
    Header,
    Footer,
    Socials,
  ],
  template: `
    <ind-header [app-title]="title()" [subtitle]="subtitle()">
      <ind-logo-coders slot="left" />
      <ind-menu [options]="menuOptions()" slot="menu" />
    </ind-header>
    <main class="container">
      <router-outlet />
    </main>
    <ind-footer>
      <ind-socials />
    </ind-footer>
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
  readonly #store = inject(Store)
  protected readonly title = signal('Curso de Angular 22 [2]')
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular 22');
  protected readonly menuOptions = signal<MenuOption[]>(getMenuItems());
 
  constructor() {
    this.#store.loadCourses();
  }
  
}
