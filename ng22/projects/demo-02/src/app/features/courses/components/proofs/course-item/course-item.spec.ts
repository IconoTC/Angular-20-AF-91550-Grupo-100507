import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItem } from './course-item';
import { By } from '@angular/platform-browser';

describe('CourseItem', () => {
  let component: CourseItem;
  let fixture: ComponentFixture<CourseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItem);
    component = fixture.componentInstance;
    // anteriormente fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test de implementación o caja blanca

  it('should have a signal course property', () => {
    expect(component['course']).toBeDefined();
    expect(typeof component['course']).toBe('function');
    expect((component['course']().title)).toContain('Curso de Angular');
  });

  // Test de comportamiento o caja negra

  it('should render course title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h3')?.textContent).toContain('Curso de Angular');
  });

  it('should render course title (with debug)', async () => {
    const debugElement = fixture.debugElement;
    const h3Element = debugElement.query(By.css('h3'));
    expect(h3Element?.nativeElement.textContent).toContain('Curso de Angular');
  });

});
