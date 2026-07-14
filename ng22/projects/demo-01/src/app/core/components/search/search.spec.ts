import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { By } from '@angular/platform-browser';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input with type text and placeholder Search', () => {
    const elementInput = fixture.nativeElement.querySelector(
      'input[type="text"][placeholder="Search..."]',
    );
    expect(elementInput).toBeInstanceOf(HTMLElement);
  });

  it('should have a button with type reset and aria-label Clear', () => {
    const elementButton = fixture.nativeElement.querySelector(
      'button[type="reset"][aria-label="Clear"]',
    );
    expect(elementButton).toBeInstanceOf(HTMLElement);
  });

  it('should type a search term and see it in the input', async () => {
    const elementInput = (HTMLInputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement);
    elementInput.value = 'User search term';
    elementInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const spanElement: HTMLParagraphElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toContain('User search term');
  });

  it('should reset the search term when clicking the reset button', async () => {
    const elementInput = (HTMLInputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement);
    elementInput.value = 'User search term';
    elementInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const focusSpy = vi.spyOn(elementInput, 'focus');
    const resetButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button'),
    ).nativeElement;
    resetButton.click();
    await fixture.whenStable();

    const spanElement: HTMLParagraphElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toContain('Esperando');
    expect(focusSpy).toHaveBeenCalled();
  });
});
