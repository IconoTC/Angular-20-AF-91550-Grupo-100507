import { inject, InjectionToken, Service } from '@angular/core';
import { ValidErrorLevel } from '../types/error-level';

export const ERROR_LEVEL = new InjectionToken<ValidErrorLevel>('ERROR_LEVEL');

@Service()
export class Logger {
  readonly #level: ValidErrorLevel = inject(ERROR_LEVEL, { optional: true }) ?? 4;

  //constructor(@Inject(ERROR_LEVEL) private readonly #level: ValidErrorLevel) {}

  get level(): ValidErrorLevel {
    return this.#level;
  }

  public error(message: string): void {
    if (this.#level > 0) {
      console.error(message);
    }
  }

  public warn(message: string): void {
    if (this.#level > 1) {
      console.warn(message);
    }
  }

  public info(message: string): void {
    if (this.#level > 2) {
      console.info(message);
    }
  }

  public log(message: string): void {
    if (this.#level > 3) {
      console.log(message);
    }
  }
}
