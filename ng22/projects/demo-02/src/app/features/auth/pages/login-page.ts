import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../core/components/card/card';
import { LoginFormTdf } from '../components/login-form-tdf/login-form-tdf';
import { LoginFormMdfRx } from '../components/login-form-mdf-rx/login-form-mdf-rx';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';
import { Sidebar } from "../../../core/components/sidebar/sidebar";
import { MenuOption } from '../../../core/types/menu-option';
import { Menu } from '../../../core/components/menu/menu';

type LoginFormType = 'tdf' | 'mdf-rx' | 'signals';

@Component({
  selector: 'ind-login-page',
  imports: [RouterLink, Card, Menu, LoginFormTdf, LoginFormMdfRx, LoginFormSignals, Sidebar],
  template: `
    <ind-sidebar [isOpenFromParent]="false">
      <ind-menu [options]="menuOptions()" [isVertical]="true" />
    </ind-sidebar>
    <h2>{{ title() }}</h2>
    @if (!formType() || formType() === 'tdf') {
      <p>Ejemplo de Template Driven Form</p>
      <ind-card>
        <ind-login-form-tdf />
      </ind-card>
    } @else if (formType() === 'mdf-rx') {
      <p>Ejemplo de Model Driven Form (RxJs)</p>
      <ind-card>
        <ind-login-form-mdf-rx />
      </ind-card>
    } @else if (formType() === 'signals') {
      <p>Ejemplo de Signals Form</p>
      <ind-card>
        <ind-login-form-signals />
      </ind-card>
    }

    <p>Si no tienes cuenta, <a [routerLink]="['/auth', 'register']">regístrate aquí</a>.</p>
  `,
  styles: ``,
  styleUrls: ['../../pages.css'],
})
export default class LoginPage {
  protected readonly formType = input<LoginFormType>('tdf');
  protected readonly title = signal('Login').asReadonly();
  protected readonly menuOptions = signal<MenuOption[]>([
    {
      label: 'Template Driven Form',
      path: '/auth/login/tdf',
    },
    {
      label: 'Model Driven Form (RxJs)',
      path: '/auth/login/mdf-rx',
    },
    {
      label: 'Signals Form',
      path: '/auth/login/signals',
    },
  ]);
}
