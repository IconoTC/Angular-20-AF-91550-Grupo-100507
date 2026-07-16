import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormCustom } from './register-form-custom';

describe('RegisterFormCustom', () => {
  let component: RegisterFormCustom;
  let fixture: ComponentFixture<RegisterFormCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
