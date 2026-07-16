import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ind-login-form-tdf',
  imports: [FormsModule, JsonPipe],
  template: `
    <!-- <p>login-form-tdf works!</p>  -->
    <form #form #ngForm="ngForm" (ngSubmit)="login(form, ngForm)">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" name="email" class="form-control" ngModel required email/>
      </label>


      @if (ngForm.controls['email']?.invalid && ngForm.controls['email']?.touched ) {
        <div class="error">
          @if (ngForm.controls['email']?.errors?.['required']) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (ngForm.controls['email']?.errors?.['email']) {
            <p>Por favor, ingrese una dirección de correo electrónico válida.</p>
          }
        </div>
      }


      <label class="form-control" for="password">
        <span> Password </span>
        <input type="password" id="password" name="password" class="form-control" ngModel required minlength="6" />
      </label>

      @if (ngForm.controls['password']?.invalid && ngForm.controls['password']?.touched ) {
        <div class="error">
          @if (ngForm.controls['password']?.errors?.['required']) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (ngForm.controls['password']?.errors?.['minlength']) {
            <p>La contraseña debe tener al menos 6 caracteres.</p>
          }
        </div>
      }

      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="ngForm.invalid">Login</button>
    </form>
    <pre>{{ ngForm.value | json }}</pre>
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
export class LoginFormTdf {

  readonly #router = inject(Router);

  login(formRef: HTMLFormElement, ngForm: NgForm) {
    console.dir(formRef);
    console.log(ngForm);

    if(ngForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    console.log('Login', ngForm.value);
    ngForm.resetForm();
    this.#router.navigate(['/']);
  }
}
