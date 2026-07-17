import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ind-login-form-mdf-rx',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="loginFormGroup" (ngSubmit)="login()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" formControlName="email" class="form-control" />
      </label>

      @if (loginFormGroup.get('email')?.invalid && loginFormGroup.get('email')?.touched) {
        <div class="error">
          @if (loginFormGroup.get('email')?.errors?.['required']) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginFormGroup.get('email')?.errors?.['email']) {
            <p>Por favor, ingrese una dirección de correo electrónico válida.</p>
          }
        </div>
      }

      <label class="form-control" for="password">
        <span> Password </span>
        <input type="password" id="password" formControlName="password" class="form-control" />
      </label>

      @if (loginFormGroup.get('password')?.invalid && loginFormGroup.get('password')?.touched) {
        <div class="error">
          @if (loginFormGroup.get('password')?.errors?.['required']) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginFormGroup.get('password')?.errors?.['minlength']) {
            <p>La contraseña debe tener al menos 6 caracteres.</p>
          }
        </div>
      }

      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" formControlName="rememberMe" />
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="loginFormGroup.invalid">Login</button>
    </form>
    <pre>{{ loginFormGroup.value | json }}</pre>
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
export class LoginFormMdfRx {
  // FormGroup, primera opción
  // protected readonly formGroup: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   rememberMe: new FormControl(false),
  // });

  readonly #fb = inject(FormBuilder);

  // FormGroup, segunda opción
  protected readonly loginFormGroup: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  readonly #router = inject(Router);

  login() {
    console.log('Login', this.loginFormGroup.value);
    this.loginFormGroup.reset();
    this.#router.navigate(['/']);

    this.loginFormGroup.valueChanges.subscribe()
  }
}
