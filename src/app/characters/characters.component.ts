import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../models/character';

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
    this.characterService.Mouseover(character);
  }

  onOut(character: EventTarget): void {
    this.characterService.Mouseout(character);
  }


}
