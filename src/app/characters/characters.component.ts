import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../models/character';
import {Mouseout, Mouseover} from '../models/cards-functions';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  characters: Character[];

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  onOver(character: EventTarget): void {
    Mouseover(character);
  }

  onOut(character: EventTarget): void {
    Mouseout(character);
  }


}
