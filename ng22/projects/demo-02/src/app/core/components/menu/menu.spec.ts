import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menu } from './menu';
import { MenuOption } from '../../types/menu-option';
import { provideRouter } from '@angular/router';


const menuOptionsMock: MenuOption[] = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
];

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', menuOptionsMock);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu items', () => {
    const options = component['options']();
    options.forEach((option, index) => {
      const itemElement: HTMLLIElement = fixture.debugElement.queryAll(By.css('li'))[index]
        .nativeElement;
      expect(itemElement.textContent).toContain(option.label);
    });
  });
});
