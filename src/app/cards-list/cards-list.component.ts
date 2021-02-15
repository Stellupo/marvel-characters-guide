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
    // this.addCarousel();
  }

  // we can receive from the parent file 2 types of card : an array of objects Characters or of id numbers.
  // if we receive an array of id, we need to convert it into an array of objects Characters
  getCardsFromID(): any {
    // if we receive cards as Character[], we don't need to convert ids into characters
    if (this.group === undefined) {
      return;
    }
    console.log('searching for group names ');
    this.characterService.getCardsFromID(this.group)
      .subscribe(characters => this.cards = characters);
  }

  onOver(character: EventTarget): void {
    this.characterService.Mouseover(character);
  }

  onOut(character: EventTarget): void {
    this.characterService.Mouseout(character);
  }

  // putting the characters cards into a carousel for Group details page
  addCarousel(): void {

    // adding the arrows buttons before and after the gallery bloc
    const membersList = document.getElementsByClassName('members_carousel')[0] as HTMLElement;
    const component = membersList.children[0].children[0] as HTMLElement;

    // if the cards are displayed on the character & group pages, return
    if (!membersList) { return; }
    console.log(membersList);

    // console.log(component.classList.contains('gallery'));

    // if the characters cards are not more than 4 todo
    if (!membersList.children[0].children[0].classList.contains('gallery')) {
      return;
    }

    console.log('adding arrows');
    membersList.firstElementChild.insertAdjacentHTML('afterbegin', '<button class="arrow" id="back_arrow";"/>');
    membersList.firstElementChild.insertAdjacentHTML('beforeend', '<button class="arrow" id="next_arrow";"/>');

    // defining the configuration of the carousel
    const card = document.getElementsByClassName('card')[0];
    const width = parseInt(getComputedStyle(card).width); // image width
    let position = 0; // ribbon (=all cards bloc inline) scroll position
    const count = 4; // visible cards count


    // defining the on-click events for each arrow
    const arrows = document.body.getElementsByClassName('arrow');
    const ul = document.querySelector('ul');

    // first arrow ⇦, shifting to the left
    arrows[0].addEventListener('click', () => {
      position += width * count;

      // ribbon shift to the left at the minimum value, position = 0
      position = Math.min(position, 0); // between one negative number and 0, we choose the furthest to 0
      document.body.querySelector('ul').style.transform = `translateX(${position}px)`;
    });


    // second arrow ⇨, shifting to the right
    arrows[1].addEventListener('click',  () => {
      position -= width * count;

      // ribbon shift to the right until reaching (total ribbon length - minimum visible image) images
      // between 2 negatives number we choose the closest to zero
      position = Math.max(position, - width * (ul.querySelectorAll('li').length - 1));
      ul.style.transform = `translateX(${position}px)`;
    });
  }
}
