import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('app-title', 'Test Title');
    fixture.componentRef.setInput('subtitle', 'Test Subtitle');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and subtitle', () => {
    const titleElement: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');
    const subtitleElement: HTMLParagraphElement = fixture.nativeElement.querySelector('.first-line');

    expect(titleElement.textContent).toContain('Test Title');
    expect(subtitleElement.textContent).toContain('Test Subtitle');
  });
});
