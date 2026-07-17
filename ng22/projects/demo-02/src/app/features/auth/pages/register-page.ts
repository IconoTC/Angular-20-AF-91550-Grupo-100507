import { Component, input, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { RouterLink } from '@angular/router';
import { RegisterForm } from '../components/register-form/register-form';
import { RegisterFormCustom } from '../components/register-form-custom/register-form-custom';
import { Menu } from '../../../core/components/menu/menu';
import { Sidebar } from '../../../core/components/sidebar/sidebar';

type RegisterFormType = 'monolithic' | 'custom';

@Component({
  selector: 'ind-register-page',
  imports: [RouterLink, Card, Menu, Sidebar, RegisterForm, RegisterFormCustom],
  template: `
    <ind-sidebar [isOpenFromParent]="false">
      <ind-menu [options]="menuOptions()" [isVertical]="true" />
    </ind-sidebar>
    <h2>{{ title() }}</h2>
    @if (!formType() || formType() === 'monolithic') {
      <p>Ejemplo de registro en un solo componente</p>
      <ind-card>
        <ind-register-form />
      </ind-card>
    } @else if (formType() === 'custom') {
      <p>Ejemplo de registro con componentes personalizados</p>
      <ind-card>
        <ind-register-form-custom />
      </ind-card>
    }
    <p>Si ya tienes cuenta, <a [routerLink]="['/auth', 'login']">inicia sesión aquí</a>.</p>
  `,
  styles: ``,
  styleUrls: ['../../pages.css'],
})
export default class RegisterPage {
  protected readonly formType = input<RegisterFormType>('monolithic');
  protected readonly title = signal('Register').asReadonly();
  protected readonly menuOptions = signal([
    {
      label: 'Monolithic Form',
      path: '/auth/register/monolithic',
    },
    {
      label: 'Custom Form',
      path: '/auth/register/custom',
    },
  ]);
}
