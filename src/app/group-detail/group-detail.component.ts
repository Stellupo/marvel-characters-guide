import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {Group} from '../models/groups';
import {ActivatedRoute} from '@angular/router';
import {Character} from '../models/character';
import {CharacterService} from '../services/character.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group;


  constructor(private groupService: GroupService,
              private characterService: CharacterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroupById();
  }

  getGroupById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => this.group = group);
  }



}
