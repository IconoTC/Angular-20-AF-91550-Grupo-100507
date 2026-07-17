import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptions } from './filter-options';

describe('FilterOptions', () => {
  let component: FilterOptions;
  let fixture: ComponentFixture<FilterOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOptions);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['Option 1', 'Option 2', 'Option 3']);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
