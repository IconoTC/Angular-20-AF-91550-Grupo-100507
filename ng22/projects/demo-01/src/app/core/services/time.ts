import { Service } from '@angular/core';

@Service()
export class Time {
  #date: Date = new Date();

  getTime() {
    return this.#date.getTime();
  }
}
