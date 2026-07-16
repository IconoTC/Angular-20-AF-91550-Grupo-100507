import { Component, input } from '@angular/core';
import { FieldState, FormField } from '@angular/forms/signals';

@Component({
  selector: 'ind-input',
  imports: [FormField],
  template: `<label class="form-control">
      <span>{{ label() }}</span>
      <input type="{{ type() }}" class="form-control" [formField]="loginControl" />
    </label>

    @if (loginControl()?.invalid() && loginControl()?.touched()) {
      <div class="error">
        <!-- {{ loginForm?.email()?.errors()[0].message }} -->

        @for (item of loginControl()?.errors(); track $index) {
          <p>{{ item.message }}</p>
        }
      </div>
    } `,
  styles: `
    .form-control {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class Input {
  label = input.required<string>();
  type = input('text');
  loginControl = input.required<FieldState<string>>();
}
