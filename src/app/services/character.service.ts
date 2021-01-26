import { Injectable } from '@angular/core';
import {Character} from '../character';
import {Observable} from 'rxjs';
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
    return this.http.get<Character[]>('api/characters').pipe(
      tap((_) => console.log('appel ok')),
      catchError(console.error('Error calling getCharacters', [])),
  );
  }

}
