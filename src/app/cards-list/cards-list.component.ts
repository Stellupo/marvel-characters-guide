import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../models/character';
import {Group} from '../models/groups';
import {Mouseout} from '../models/cards-functions';
import {Mouseover} from '../models/cards-functions';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  @Input() cards: Character[] | number[] | Group[];
  @Input() group: Group;
  @Input() link: string;

  ngOnInit(): void {
    this.getCardsFromID();
  }

  // we can receive from the parent file 2 types of card : an array of objects Characters / Groups or of id numbers.
  // if we receive an array of id, we need to convert it into an array of objects Characters
  getCardsFromID(): any {
    // if we receive cards as Character[] or Group[], we don't need to convert ids into characters
    if (this.group === undefined) {
      return;
    }
    console.log('searching for group names ');
    this.characterService.getCardsFromID(this.group)
      .subscribe(characters => this.cards = characters);
  }

  onOver(character: EventTarget): void {
      Mouseover(character);
  }

  onOut(character: EventTarget): void {
    Mouseout(character);
  }

}
