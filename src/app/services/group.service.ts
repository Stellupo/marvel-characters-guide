import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../groups';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Character} from '../character';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  /** GET groups from the server */
  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('api/groups')
      .pipe(
        tap(_ => console.log('groups ok')),
        catchError(this.handleError<Group[]>('getGroups', [])),
      );
  }

  /** GET group by name. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = 'api/groups' + `/${id}`;
    return this.httpClient.get<Group>(url).pipe(
      tap(_ => console.log(`fetched groups id=${id}`)),
      catchError(this.handleError<Group>(`getGroups id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
