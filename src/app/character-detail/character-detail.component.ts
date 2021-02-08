import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {ActivatedRoute} from '@angular/router';
import {Character} from '../models/character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent implements OnInit {

  character: Character;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacter(id)
      .subscribe(character => this.character = character);
  }

}
