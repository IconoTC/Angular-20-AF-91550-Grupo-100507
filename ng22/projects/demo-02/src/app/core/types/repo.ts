import { Observable } from "rxjs";

export interface Repo<T extends { id: number | string }> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>; // Error en caso de que no exista el item con el id
  create(item:  Omit<T, 'id'>): Promise<T>; 
  update(id: T['id'], item: Omit<T, 'id'>): Promise<T>; // Error en caso de que no exista el item con el id
  delete(id: T['id']): Promise<void>;  // Error en caso de que no exista el item con el id
}

export interface RepoRx<T extends { id: number | string }> {
  getAll(): Observable<T[]>;
  getById(id: T['id']): Observable<T>; // Error en caso de que no exista el item con el id
  create(item:  Omit<T, 'id'>): Observable<T>; 
  update(id: T['id'], item: Omit<T, 'id'>): Observable<T>; // Error en caso de que no exista el item con el id
  delete(id: T['id']): Observable<void>;  // Error en caso de que no exista el item con el id
}