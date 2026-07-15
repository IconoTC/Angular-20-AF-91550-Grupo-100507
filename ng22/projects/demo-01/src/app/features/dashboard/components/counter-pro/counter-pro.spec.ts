import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPro } from './counter-pro';

describe('CounterPro', () => {
  let component: CounterPro;
  let fixture: ComponentFixture<CounterPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterPro],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
