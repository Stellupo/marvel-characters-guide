import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service';
import {Group} from '../groups';
import {CharacterService} from '../services/character.service';

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

  onOut(group: Group): void  {
    this.characterService.Mouseout(group);
  }

  onOver(group: Group): void {
    this.characterService.Mouseover(group);
  }
}
