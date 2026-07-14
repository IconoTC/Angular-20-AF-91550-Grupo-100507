import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemSignals } from './course-item-signals';

describe.todo('CourseItemSignals', () => {
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

  async function createComponent() {
    fixture = TestBed.createComponent(CourseItemSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should update plainMessage after 2 seconds', async () => {
    vi.useFakeTimers();
    await createComponent();
    vi.advanceTimersByTime(2100);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const pElement = element.querySelector('p')

    expect(pElement?.textContent).toBe('Mensaje actualizado después de 2 seg');
  });
});
