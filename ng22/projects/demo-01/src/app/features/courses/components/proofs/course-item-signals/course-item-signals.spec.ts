import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemSignals } from './course-item-signals';

describe('CourseItemSignals', () => {
  let component: CourseItemSignals;
  let fixture: ComponentFixture<CourseItemSignals>;

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemSignals],
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(CourseItemSignals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should NOT update plainMessage after 2 seconds', async () => {
    vi.useFakeTimers();
    createComponent();
    vi.advanceTimersByTime(2100);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const pElement = element.querySelectorAll('p')[1]

    expect(pElement?.textContent).toBe('Este es un mensaje plano');
    expect(pElement?.textContent).not.toContain('actualizado');
  });

    it('should update title WITH SIGNALS after 6 seconds', async () => {
    vi.useFakeTimers();
    createComponent();

    vi.advanceTimersByTime(6100);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const h3Element = element.querySelector('h3');
    const pElement = element.querySelectorAll('p')[1]

    expect(h3Element?.textContent).toContain('Actualizado');
    expect(pElement?.textContent).toContain('actualizado');
  });
});
