import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';
import { CourseItemPro } from '../../../features/courses/components/course-item-pro/course-item-pro';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Card } from '../card/card';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import { Socials } from '../socials/socials';

@Component({
  selector: 'ind-root',
  imports: [
    RouterOutlet,
    LogoCoders,
    Menu,
    CourseItem,
    CourseItemSignals,
    CourseItemPro,
    Header,
    Footer,
    Card,
    Socials,
  ],
  template: `
    <ind-header>
      <ind-logo-coders slot="left" />
      <ind-menu slot="menu" />
    </ind-header>
    <main class="container">
      <router-outlet />
      <p>Este es un proyecto de demostración de Angular 22</p>
      <ind-card>
        <ind-course-item-pro />
      </ind-card>
      <details>
        <summary>Componentes de ejemplo previos</summary>
        <ind-course-item />
        <ind-course-item-signals />
      </details>
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
  //protected readonly title = signal('Curso de Angular 22')
}
