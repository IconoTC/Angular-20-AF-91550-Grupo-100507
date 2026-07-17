import { Component, signal } from '@angular/core';
import { FilterOptions } from './filter-options';

const COURSES = [
  {
    name: 'Angular',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    name: 'React',
    levels: ['Beginner', 'Intermediate'],
  },
  {
    name: 'Node.js',
    levels: ['Intermediate', 'Advanced'],
  },
];

const COURSES_NAMES = COURSES.map((course) => course.name);

interface CourseFilter {
  name: string;
  level: string;
}

@Component({
  selector: 'ind-filter',
  imports: [FilterOptions],
  template: `
    <ind-filter-options [options]="options()" (optionEmitter)="courseSelect($event)" />
    <ind-filter-options [options]="levels()" (optionEmitter)="levelSelect($event)" />

    <p>Selected Course: {{ selectedFilter().name }}</p>
    <p>Selected Level: {{ selectedFilter().level }}</p>
  `,
  styles: ``,
})
export class Filter {
  protected readonly options = signal(COURSES_NAMES);
  protected readonly levels = signal<string[]>(COURSES[0].levels);

  private getCourseLevels(courseName: string): string[] {
    return COURSES.find((course) => course.name === courseName)?.levels || [];
  }
  private getCourseFirstLevel(courseName: string): string {
    return COURSES.find((course) => course.name === courseName)?.levels[0] || '';
  }

  protected readonly selectedFilter = signal<CourseFilter>({
    name: COURSES_NAMES[0],
    level: this.getCourseFirstLevel(COURSES_NAMES[0]),
  });

  protected courseSelect(option: string) {
    console.log('Selected course:', option);
    this.levels.set(COURSES.find((course) => course.name === option)?.levels || []);
    this.selectedFilter.set({
      name: option,
      level: this.getCourseFirstLevel(option),
    });
  }

  protected levelSelect(option: string) {
    console.log('Selected level:', option);
    this.selectedFilter.update((filter) => ({
      ...filter,
      level: option,
    }));
  }
}
