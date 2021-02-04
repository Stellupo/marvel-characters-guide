import { Injectable } from '@angular/core';
import {Character} from '../character';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Group} from '../groups';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient) { }

  /** GET characters from the server */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('api/characters')
      .pipe(
        tap(_ => console.log('characters ok')),
        catchError(this.handleError<Character[]>('getCharacters', [])),
      );
  }

  /** GET character by id. Will 404 if id not found */
  getCharacter(id: number): Observable<Character> {
    const url = 'api/characters' + `/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => console.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  searchCharacters(character: string): Observable<Character[]> {
    if (!character.trim()) {
      // if not search character, return empty array.
      return of([]);
    }
    // else return an array of the characters whose names fit the search
    return this.http.get<Character[]>(`api/characters/?name=${character}`).pipe(
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

  /** changing appearance of the character cards when the mouse is over them */
  Mouseover(card: Character | Group): void {
    const divs = document.body.getElementsByClassName('txt_wrapper') as HTMLCollectionOf<HTMLElement>;
    const i = Number(card.id) - 1;

    const title = divs[i].firstElementChild as HTMLElement;
    title.style.display = 'none';

    const intro = divs[i].lastElementChild as HTMLElement;
    intro.style.display = 'none';

    divs[i].style.backgroundColor = 'rgba(32,32,32,0.2)';
  }

  /** changing appearance of the character cards when the mouse is out */
  Mouseout(card: Character | Group): void {
    const divs = document.body.getElementsByClassName('txt_wrapper') as HTMLCollectionOf<HTMLElement>;
    const i = Number(card.id) - 1;

    const title = divs[i].firstElementChild as HTMLElement;
    title.style.display = '';

    const intro = divs[i].lastElementChild as HTMLElement;
    intro.style.display = '';

    divs[i].style.backgroundColor = 'rgba(32,32,32,0.8)';
  }



}
