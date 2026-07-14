import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCoders } from './logo-coders';
import { By } from '@angular/platform-browser';

describe('LogoCoders', () => {
  let component: LogoCoders;
  let fixture: ComponentFixture<LogoCoders>;

  beforeEach(async () => {

    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await TestBed.configureTestingModule({
      imports: [LogoCoders],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoCoders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('svg')).toBeTruthy();
  });

  it('should respond to click events', async () => {

    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector('#upper')?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('upper')
    );
  });

    it('should respond to click events (with debug element)', async () => {

    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('#down'));
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('lower')
    );
  })

});
