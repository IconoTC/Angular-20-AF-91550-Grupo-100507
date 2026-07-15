import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import { Socials } from '../socials/socials';
import HomePage from '../../../features/home/home-page';
import CoursesPage from '../../../features/courses/courses-page';
import AboutPage from '../../../features/about/about-page';
import DashboardPage from '../../../features/dashboard/dashboard-page';
import { MenuOption } from '../../types/menu-option';
import { getMenuItems } from '../../../app.routes';

@Component({
  selector: 'ind-root',
  imports: [
    RouterOutlet,
    LogoCoders,
    Menu,
    HomePage,
    CoursesPage,
    DashboardPage,
    AboutPage,
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
      <p>El router cargará la página adecuada</p>
      <ind-home-page id="home"/>
      <ind-courses-page id="courses"/>
      <ind-dashboard-page id="dashboard"/>
      <ind-about-page id="about"/>
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
  protected readonly title = signal('Curso de Angular 22')
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular 22');
  protected readonly menuOptions = signal<MenuOption[]>(getMenuItems());
}
