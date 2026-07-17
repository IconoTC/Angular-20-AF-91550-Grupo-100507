import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Input } from "../../../../core/components/input/input";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'ind-login-form-signals',
  imports: [FormField, JsonPipe, Input],
  template: `
    <form (submit)="login()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" class="form-control" [formField]="loginForm.email" />
      </label>

      @if (loginForm.email()?.invalid() && loginForm.email()?.touched()) {
        <div class="error">
          <!-- {{ loginForm?.email()?.errors()[0].message }} -->

          @for (item of loginForm?.email()?.errors(); track $index) {
            <p>{{ item.message }}</p>
          }
        </div>
      }

      <!-- <label class="form-control" for="password">
        <span> Password </span>
        <input
          type="password"
          id="password"
          class="form-control"
          [formField]="loginForm.password"
        />
      </label> -->
      
      <ind-input [loginControl]="loginForm.password()" [label]="'Password'" [type]="'password'"></ind-input>

      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" [formField]="loginForm.rememberMe" />
        <span>Remember me</span>
      </label>


      <button type="submit" [disabled]="loginForm().invalid()">Login</button>
    </form>
    <br>
    <p>Errores del formulario</p>
    <ul class="error">
      @for (error of loginForm().errorSummary(); track $index) {
        <li>{{ error.message }}</li>
      }
    </ul>
    <pre>{{ loginFormState.value() | json }}</pre>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    input,
    textarea {
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

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class LoginFormSignals {
  readonly #loginInitialState: LoginForm = {
    email: '',
    password: '',
    rememberMe: false,
  };

  readonly #loginModel = signal<LoginForm>(this.#loginInitialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly #loginScheme = (path: any) => {
    required(path.email, {
      message: 'El correo electrónico es obligatorio.',
    });
    email(path.email, {
      message: 'Por favor, ingrese una dirección de correo electrónico válida.',
    });
    required(path.password, {
      message: 'La contraseña es obligatoria.',
    });
    minLength(path.password, 6, {
      message: 'La contraseña debe tener al menos 6 caracteres.',
    });
  };

  protected readonly loginForm = form(this.#loginModel, this.#loginScheme);
  protected readonly loginFormState = this.loginForm();

  protected login() {
    console.log('Login', this.loginFormState);
    console.log('login');
  }
}
