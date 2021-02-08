import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/groups';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Character} from '../models/character';


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

  /** GET group by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = 'api/groups' + `/${id}`;
    return this.httpClient.get<Group>(url).pipe(
      tap(_ => console.log(`fetched groups id=${id}`)),
      catchError(this.handleError<Group>(`getGroups id=${id}`))
    );
  }

  searchGroups(group: string): Observable<Group[]> {
    if (!group.trim()) {
      // if not search character, return empty group array.
      return of ([]);
    }
    // else return an array of the characters whose names fit the search
    return this.httpClient.get<Group[]>(`api/groups/?name=${group}`).pipe(
      tap(x => x.length ?
        console.log(`found groups matching "${group}"`) :
        console.log(`no groups matching "${group}"`)),
      catchError(this.handleError<Group[]>('searchGroups', []))
    );
  }

  /** GET members info by id. Will 404 if id not found */
  getGroupMembers(members: number[]): Observable<Character[]> {
    if (!members) {
      // if no members in the group, return empty array.
      return of([]);
    }

    /* else return an array of the members whose names fit the search
    for (const character of members) {
      return this.httpClient.get<Character[]>(`api/characters/?name=${character}`).pipe(
        tap(x => x.length ?
          console.log(`found "${character}" in the group`) :
          console.log(`no "${character}" in the group`)),
        catchError(this.handleError<Character[]>('getGroupCharacters', []))
      );*/
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
