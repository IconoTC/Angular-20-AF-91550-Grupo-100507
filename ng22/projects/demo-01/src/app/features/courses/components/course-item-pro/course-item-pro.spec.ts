import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemPro } from './course-item-pro';

describe('CourseItemPro', () => {
  let component: CourseItemPro;
  let fixture: ComponentFixture<CourseItemPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemPro],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemPro);
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

  it('should render course description', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.details p')?.textContent).toContain('Angular');
  });

  it('should update view when user click button and utility changes', async () => {
    // const element = fixture.nativeElement as HTMLElement;
    // const initialUtility = component['course']().courseStats.utility;
    // const utilityOutput = element.querySelector('.stats .course-stats output') as HTMLElement;

    // expect(utilityOutput.textContent).toBe(initialUtility.toString());

    // // Change the utility stat
    // component['changeStats']('utility', 1);
    // fixture.detectChanges();
    // await fixture.whenStable();

    // const updatedUtility = component['course']().courseStats.utility;
    // expect(utilityOutput.textContent).toBe(updatedUtility.toString());

    const element = fixture.nativeElement as HTMLElement;

    const utilityOutput = element.querySelector('.stats .course-stats output') as HTMLElement;

    expect(utilityOutput.textContent).toBe("7");

    // Simulate a click on the increment button
    const incrementButton = element.querySelector('.course-courseStats-buttons button:nth-child(2)') as HTMLButtonElement;
    incrementButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(utilityOutput.textContent).toBe('8');
  });

  it('should update view when user click button and difficulty changes', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const initialDifficulty = component['course']().courseStats.difficulty;
    const difficultyOutput = element.querySelector('[aria-label="Dificultad"] output') as HTMLElement;

    expect(difficultyOutput.textContent).toBe(initialDifficulty.toString());

    // Change the difficulty stat
    component['changeStatsFull']('difficulty', 1);
    fixture.detectChanges();
    await fixture.whenStable();

    const updatedDifficulty = component['course']().courseStats.difficulty;
    expect(difficultyOutput.textContent).toBe(updatedDifficulty.toString());
  });


});
