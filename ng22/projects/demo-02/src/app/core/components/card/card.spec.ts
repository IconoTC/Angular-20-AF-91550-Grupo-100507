import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const TEXT = "Hello World";

@Component({
  imports: [Card],
  template: `<ind-card> {{ text }} </ind-card>`,
})
class TestHostComponent {
  protected readonly text = TEXT;
}


describe('Card', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the text inside the card', () => {
    fixture.detectChanges();
    // const cardElement: HTMLElement = fixture.nativeElement.querySelector('ind-card');
    const cardElement: HTMLElement = fixture.debugElement.query(By.directive(Card)).nativeElement;
    expect(cardElement.textContent?.trim()).toBe(TEXT);
  });
});
