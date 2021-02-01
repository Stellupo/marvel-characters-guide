import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../character';
import {Router} from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private characterService: CharacterService,
              private router: Router) { }

  characters: Character[];

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  onOver(character: Character): void {
    this.characterService.Mouseover(character);
  }

  onOut(character: Character): void {
    this.characterService.Mouseout(character);
  }

  OnViewCharacter(id: number): void {
    this.router.navigate(['/characters', id]);
  }

}
