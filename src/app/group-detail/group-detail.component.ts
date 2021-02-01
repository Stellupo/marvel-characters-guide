import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {Group} from '../groups';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  @Input() group: Group;

  constructor(private groupService: GroupService,
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
