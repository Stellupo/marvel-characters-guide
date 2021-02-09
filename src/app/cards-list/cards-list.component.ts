import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Router} from '@angular/router';
import {Character} from '../models/character';
import {Group} from '../models/groups';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  @Input() cards: Character[] | number[];
  @Input() group: Group;

  ngOnInit(): void {
    this.getCardsFromID();
  }

  // we can receive from the parent file 2 types of card : an array of objects Characters or of id numbers.
  // if we receive an array of id, we need to convert it into an array of objects Characters
  getCardsFromID(): any {
    // if we receive cards as Character[], we don't need to convert ids into characters
    if (this.group === undefined) {
      return;
    }
    console.log('searching for group members ');
    this.characterService.getCardsFromID(this.group)
      .subscribe(characters => this.cards = characters);
  }

  onOver(character: EventTarget): void {
    this.characterService.Mouseover(character);
  }

  onOut(character: EventTarget): void {
    this.characterService.Mouseout(character);
  }
}
