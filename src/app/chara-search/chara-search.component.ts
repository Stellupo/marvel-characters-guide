import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../character';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-chara-search',
  templateUrl: './chara-search.component.html',
  styleUrls: ['./chara-search.component.css']
})
export class CharaSearchComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  characters$: Observable<Character[]>; // no need to subscribe to this observable thanks to the pipe async in the template
  private searchCharacters = new Subject<string>();

  ngOnInit(): void {
    this.characters$ = this.searchCharacters.pipe(
      // waits 300ms after each keystroke before considering the term
      debounceTime(300),

      // ensures that a request is sent only if the filter text changed
      distinctUntilChanged(),

      // calls the search service for each search term that makes it through debounce() and distinctUntilChanged().
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.characterService.searchCharacters(term)),
    );
  }

  // this function force our subject searchCharacters to contain the search term
  search(term: string): void {
    this.searchCharacters.next(term);
  }
}
