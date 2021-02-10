import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/groups';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Character} from '../models/character';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  /** GET groups from the server */
  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('http://127.0.0.1:8000/api/groups')
      .pipe(
        tap(_ => console.log('groups ok')),
        catchError(this.handleError<Group[]>('getGroups', [])),
      );
  }

  /** GET group by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = 'http://127.0.0.1:8000/api/groups' + `/${id}`;
    return this.httpClient.get<Group>(url).pipe(
      tap(_ => console.log(`fetched groups id=${id}`)),
      catchError(this.handleError<Group>(`getGroups id=${id}`))
    );
  }

  /** GET groups from ids. Will 404 if id not found */
  getGroupsFromID(character: Character): Observable<Group[]> {
    const url = ('http://127.0.0.1:8000/api/groups');
    return this.httpClient.get<Group[]>(url).pipe(
      // filter to return only the characters whose ids is in the group
      map(groups => groups.filter(group => group.members.includes(character.id))),
      tap(_ => console.log('fetched groups')),
      catchError(this.handleError<Group[]>('getGroupsFromId', [])),
    );
  }

  searchGroups(group: string): Observable<Group[]> {
    if (!group.trim()) {
      // if not search character, return empty group array.
      return of ([]);
    }
    // else return an array of the characters whose names fit the search
    return this.httpClient.get<Group[]>('http://127.0.0.1:8000/api/groups?name' + `=${group}`).pipe(
      tap(x => x.length ?
        console.log(`found groups matching "${group}"`) :
        console.log(`no groups matching "${group}"`)),
      catchError(this.handleError<Group[]>('searchGroups', []))
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
