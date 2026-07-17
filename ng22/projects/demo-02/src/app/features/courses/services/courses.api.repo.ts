import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RepoRx } from '../../../core/types/repo';
import { Course } from '../types/course';
import { delay, map, Observable } from 'rxjs';

const MOCK_DELAY = 2000; // 2 segundos de retraso para simular asincronía

@Service()
export class CoursesApiRepo implements RepoRx<Course> {
  readonly #http = inject(HttpClient);
  readonly #url = environment.API_URL + '/courses';

  async load(): Promise<Course[]> {
    const response = await fetch(this.#url, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.statusText}`);
    }
    const data: Course[] = await response.json();
    return data;
  }


  getAll(): Observable<Course[]> {
    return this.#http.get<Course[]>(this.#url).pipe(
        delay(MOCK_DELAY)
    );
  }
  getById(id: Course['id']): Observable<Course> {
    const url = `${this.#url}/${id}`;
    return this.#http.get<Course>(url).pipe(
      delay(MOCK_DELAY)
    );
  }
  create(item: Omit<Course, 'id'>): Observable<Course> {
    return this.#http.post<Course>(this.#url, item).pipe(
      delay(MOCK_DELAY)
    );
  }
  updateTotal(id: Course['id'], item: Omit<Course, 'id'>): Observable<Course> {
    const url = `${this.#url}/${id}`;
    return this.#http.put<Course>(url, item).pipe(
      delay(MOCK_DELAY)
    );
  }
   update(id: Course['id'], item: Partial<Omit<Course, 'id'>>): Observable<Course> {
    const url = `${this.#url}/${id}`;
    return this.#http.patch<Course>(url, item).pipe(
      delay(MOCK_DELAY)
    );
  }
  delete(id: Course['id']): Observable<void> {
    const url = `${this.#url}/${id}`;
    return this.#http.delete<Course>(url).pipe(
      delay(MOCK_DELAY),
    ).pipe(
      map(() => undefined)
    );
  }



}
