import { Component, inject, signal } from '@angular/core';
import { Time } from '../../../../core/services/time';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../../core/pipes/truncate-pipe';

@Component({
  selector: 'ind-info',
  imports: [DatePipe, TitleCasePipe, TruncatePipe],
  template: ` <h3>Información del proyecto</h3>
    <p>Este proyecto es un ejemplo de uso de Angular 22 y sus nuevas características.</p>
    <ul>
      <li>Angular 22</li>
      <li>TypeScript 6.0</li>
      <li>ES2026</li>
    </ul>
    <h4>Uso del pipe Truncate</h4>
    <p>[30]: {{ message() | truncate: 30 }}</p>
    <p>[40]: {{ message() | truncate: 40 }}</p>
    <footer>
      <ul>
        <li>Autor: {{ author() }}</li>
        <li>Fecha: {{ currentDate() | date: 'fullDate' | titlecase }}</li>
      </ul>
      <p>TimeStamp: {{ ts.getTime() }}</p>
    </footer>`,
  styles: `
    ul {
      list-style-type: none;
      padding: 0;
    }

    p {
      max-width: 23rem;
    }

    footer {
      font-size: 0.9em;
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      border-top: 2px solid var(--color-primary);
      border-radius: 0.5rem;
      margin-top: 1rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class Info {
  protected readonly author = signal('Alejandro Cerezo');
  protected readonly currentDate = signal(new Date());

  protected readonly ts = inject(Time);

  protected readonly message = signal(
    'Esto es un ejemplo de texto largo, para mostrar solo una parte de él',
  );

  // Forma previa de importar los servicios
  // constructor(protected ts: Time ) {
  // }
}
