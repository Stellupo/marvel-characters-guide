import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {CHARACTERS} from '../mock-characters';
import {GROUPS} from '../mock-groups';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = CHARACTERS;
    const groups = GROUPS;

    return { characters, groups }; // if the data objects are empty, we return an empty initialized one
  }
}
