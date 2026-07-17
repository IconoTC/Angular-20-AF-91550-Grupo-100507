import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    redirectTo: 'login/tdf',
  },
  {
    path: 'login/:formType',
    // component: LoginPage,
    loadComponent: () => import('../pages/login-page'),
    title: 'Login | Demo 01',
  },
  {
    path: 'register',
    redirectTo: 'register/monolithic',
  },
  {
    path: 'register/:formType',
    // component: RegisterPage,
    loadComponent: () => import('../pages/register-page'),
    title: 'Register | Demo 01',
  },
];
