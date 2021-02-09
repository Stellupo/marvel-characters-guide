import { Injectable } from '@angular/core';
import {Character} from '../models/character';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/groups';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient) { }

  /** GET characters from the server */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('http://127.0.0.1:8000/api/characters')
      .pipe(
        tap(_ => console.log('characters ok')),
        catchError(this.handleError<Character[]>('getCharacters', [])),
      );
  }

  /** GET character by id. Will 404 if id not found */
  getCharacter(id: number): Observable<Character> {
    const url = 'http://127.0.0.1:8000/api/characters' + `/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => console.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  /** GET characters by id. Will 404 if id not found */
  getCardsFromID(group: Group): Observable<Character[]> {
    const url = ('http://127.0.0.1:8000/api/characters');
    return this.http.get<Character[]>(url).pipe(
      map(characters => characters.filter(character => group.members.includes(character.id))),
      tap(_ => console.log('fetched characters')),
      catchError(this.handleError<Character[]>('getGroupMembers', [])),
    );
  }

  searchCharacters(character: string): Observable<Character[]> {
    if (!character.trim()) {
      // if not search character, return empty array.
      return of([]);
    }
    // else return an array of the characters whose names fit the search
    return this.http.get<Character[]>('http://127.0.0.1:8000/api/characters?name' + `=${character}`).pipe(
      tap(x => x.length ?
        console.log(`found characters matching "${character}"`) :
        console.log(`no characters matching "${character}"`)),
      catchError(this.handleError<Character[]>('searchCharacters', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T); // Let the app keep running by returning an empty result.
    };
  }

  /** changing appearance of the cards when the mouse is over them */
  Mouseover(card: EventTarget): void {
    const li = (card as HTMLElement).parentElement;
    const div = li.firstElementChild as HTMLElement;

    if (div.className !== 'txt_wrapper') {return; }
    console.log('Changing appearance when mouse on');

    const title = div.firstElementChild as HTMLElement;
    title.style.display = 'none';

    const intro = div.lastElementChild as HTMLElement;
    intro.style.display = 'none';

    div.style.backgroundColor = 'rgba(32,32,32,0.2)';
  }

  /** changing appearance of the cards when the mouse is out */
  Mouseout(card: EventTarget): void {
    const li = (card as HTMLElement).parentElement;
    const div = li.firstElementChild as HTMLElement;

    if (div.className !== 'txt_wrapper') {return; }
    console.log('Changing appearance when mouse out');

    const title = div.firstElementChild as HTMLElement;
    title.style.display = '';

    const intro = div.lastElementChild as HTMLElement;
    intro.style.display = '';

    div.style.backgroundColor = 'rgba(32,32,32,0.8)';
  }

}
