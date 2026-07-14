import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';

export const routes: Routes = [];

export function getMenuItems(): MenuOption[] {
  return [
    {
      label: 'Inicio',
      path: '#home'
    },
    {
      label: 'Dashboard',
      path: '#dashboard'
    },
    {
      label: 'Courses',
      path: '#courses'
    },
    {
      label: 'About',
      path: '#about'
    }
  ];
}
