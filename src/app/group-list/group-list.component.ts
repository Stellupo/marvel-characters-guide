import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../models/character';
import {GroupService} from '../services/group.service';
import {Group} from '../models/groups';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor( private groupService: GroupService,
               private router: Router) { }

  @Input() character: Character;
  groups: Group[];

  ngOnInit(): void {
    this.getGroupsFromID();
  }

  getGroupsFromID(): any {
    console.log('searching for group members ');
    this.groupService.getGroupsFromID(this.character)
      .subscribe(groups => this.groups = groups);
  }

  OnClick(group: Group): void {
    this.router.navigate(['/groups', group.id]);
  }

}
