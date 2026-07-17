import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'ind-filter-options',
  imports: [],
  template: `
    <div class="options">
      @for (option of options(); track option) {
        <button [class.selected]="option === selectedOption()" (click)="selectOption(option)">
          {{ option }}
        </button>
      }
    </div>
    <!-- <p>Selected Course: {{ selectedCourse().name }}</p>
    <p>Selected Level: {{ selectedCourse().level }}</p> -->
  `,
  styles: `
    .options {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      justify-content: center;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: var(--color-primary);
        color: white;
        cursor: pointer;
        &:hover {
          background-color: var(--color-primary-hot);
        }
        &.selected {
          background-color: var(--color-primary-hot);
          outline: 2px solid var(--color-secondary);
        }
      }
    }
  `,
})
export class FilterOptions {
  readonly options = input.required<string[]>();
  // protected readonly selectedOption = signal<string>('');

  // protected readonly selectedOption = linkedSignal<string>(() => {
  //   return this.options().length > 0 ? this.options()[0] : '';
  // });

  protected readonly selectedOption = linkedSignal({
    source: this.options,
    computation: (options, prev) => {
      if (!options.length) {
        return '';
      }
      if (!prev || !options.includes(prev.value as string)) {
        return options[0];
      }
      return prev.value;
    },
  });

  protected readonly optionEmitter = output<string>();

  // constructor() {
  //   effect(() => {
  //     const options = this.options();
  //     const option = this.selectedOption();
  //     if (option && options.includes(option)) {
  //       this.selectedOption.set(option);
  //     } else {
  //       this.selectedOption.set(options[0] || '');
  //     }
  //   });
  // }

  selectOption(option: string) {
    this.selectedOption.set(option);
    this.optionEmitter.emit(option);
  }
}
