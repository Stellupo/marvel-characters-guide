import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  characters: Character[];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  onOver(character: Character) {
    this.characterService.overCharacter(character);
  }

  onOut(character: Character) {
    this.characterService.outCharacter(character);
  }

}
