import { Component, effect, ElementRef, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ind-search',
  imports: [FormsModule],
  template: ` <input
      #text_input
      type="text"
      placeholder="Search..."
      /* [ngModel]="searchText()"
      (ngModelChange)="searchText.set($event)" */
      [(ngModel)]="searchText"
    />
    <span class="form-result">{{
      searchText() === '' ? 'Esperando' : 'Buscando ' + searchText()
    }}</span>
    <button type="reset" (click)="resetSearch()" title="Reset" aria-label="Clear">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        [attr.width]="size()"
        [attr.height]="size()"
        fill="currentColor"
      >
        <path
          d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"
        />
      </svg>
    </button>`,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
    }
    .form-result {
      font-size: 0.8rem;
      color: var(--color-primary-hot);
      width: min-content;
    }
    button {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border: none;
      cursor: pointer;
    }
    input {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border-radius: 0.5rem;
      padding: 0.3rem;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
  `,
})
export class Search implements OnInit {
  protected readonly searchText = signal('');
  protected readonly size = signal('1rem');

  // @ViewChild('text_input') textInputElement!: ElementRef<HTMLInputElement>;

  protected readonly textInputElement = viewChild<ElementRef<HTMLInputElement>>('text_input');


  constructor() {
     console.log('Ref desde el constructor', this.textInputElement());

     effect(() => {
      console.log('Ref desde el effect', this.textInputElement());
     })

  }

  ngOnInit(): void {
    console.log('On Init');
  }

  resetSearch() {
    this.searchText.set('');
    console.log('Desde el reset', this.textInputElement());
    this.textInputElement()?.nativeElement.focus();
  }
}


