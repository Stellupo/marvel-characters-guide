import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service';
import {Group} from '../models/groups';
import {CharacterService} from '../services/character.service';
import {Mouseout} from '../models/cards-functions';
import {Mouseover} from '../models/cards-functions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
              private characterService: CharacterService) {}

  groups: Group[];

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  onOut(group: EventTarget ): void  {
    Mouseout(group);
  }

  onOver(group: EventTarget): void {
    Mouseover(group);
  }
}
