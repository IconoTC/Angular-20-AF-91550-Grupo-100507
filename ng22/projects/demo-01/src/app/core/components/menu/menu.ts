import { Component, signal } from '@angular/core';
import { getMenuItems } from '../../../app.routes';
import { MenuOption } from '../../types/menu-option';

@Component({
  selector: 'ind-menu',
  imports: [],
  template: `<nav>
      <ul>
        @for (option of options(); track option.label) {
          <li>
            <a [href]="option.path">{{ option.label }}</a>
          </li>
        }
      </ul>
    </nav>
    , `,
  styles: `
      nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      .vertical {
        flex-direction: column;
        a {
          font-size: 1.8rem;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }`,
})
export class Menu {
  protected readonly options = signal<MenuOption[]>(getMenuItems());
}
