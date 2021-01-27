import { Injectable } from '@angular/core';
import {Character} from '../character';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


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
        tap(_ => console.log('appel ok')),
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  overCharacter(character: Character) {
    const divs = document.body.getElementsByClassName('txt_wrapper') as HTMLCollectionOf<HTMLElement>;
    const i = Number(character.id) - 1;

    const title = divs[i].firstElementChild as HTMLElement;
    title.style.display = 'none';

    const intro = divs[i].lastElementChild as HTMLElement;
    intro.style.display = 'none';
    divs[i].style.backgroundColor = 'rgba(32,32,32,0.2)';
  }

  outCharacter(character: Character) {
    const divs = document.body.getElementsByClassName('txt_wrapper') as HTMLCollectionOf<HTMLElement>;
    const i = Number(character.id) - 1;

    const title = divs[i].firstElementChild as HTMLElement;
    title.style.display = '';

    const intro = divs[i].lastElementChild as HTMLElement;
    intro.style.display = '';
    divs[i].style.backgroundColor = 'rgba(32,32,32,0.8)';
  }

}
