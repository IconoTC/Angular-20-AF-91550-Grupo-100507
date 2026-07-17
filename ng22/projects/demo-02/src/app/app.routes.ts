import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';
import { Time } from './core/services/time';
import { authRoutes } from './features/auth/routes/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    // component: HomePage,
    loadComponent: () => import('./features/home/home-page'),
    title: 'Inicio | Demo 02',
    data: {
      label: 'Inicio',
    },
  },
  {
    path: 'dashboard',
    // component: DashboardPage,
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    title: 'Dashboard | Demo 02',
    data: {
      label: 'Dashboard',
    },
    providers: [Time],
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'courses',
    // component: CoursesPage,
    loadComponent: () => import('./features/courses/courses-page'),
    title: 'Cursos | Demo 02',
    data: {
      label: 'Cursos',
    },
  },
  {
    path: 'about',
    // component: AboutPage,
    loadComponent: () => import('./features/about/about-page'),
    title: 'About | Demo 02',
    data: {
      label: 'About',
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

export function getMenuItems(): MenuOption[] {
  return routes
    .filter((route) => route.data?.['label'])
    .map((route) => ({
      label: route.data!['label'] as string,
      path: route.path as string,
    }));
}
