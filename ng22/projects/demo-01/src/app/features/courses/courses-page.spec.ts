import { ComponentFixture, TestBed } from '@angular/core/testing';

import CoursesPage from './courses-page';
import { By } from '@angular/platform-browser';
import { CourseItemPro } from './components/course-item-pro/course-item-pro';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have render the correct page title', () => {
    const debugHeading = fixture.debugElement.query(By.css('h2'));
    const elementHeading = debugHeading.nativeElement as HTMLElement;
    expect(elementHeading.textContent).toContain('Cursos');
  });

  it('should have render the course item pro component', () => {
    const debugCourseItemPro = fixture.debugElement.query(By.directive(CourseItemPro));
    expect(debugCourseItemPro).toBeTruthy();
    expect(debugCourseItemPro.nativeElement).toBeInstanceOf(HTMLElement);
  });
});
