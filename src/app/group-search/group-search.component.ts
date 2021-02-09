import { Component, OnInit } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Group} from '../models/groups';
import {GroupService} from '../services/group.service';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})
export class GroupSearchComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  groups$: Observable<Group[]>; // no need to subscribe to this observable thanks to the pipe async in the template
  // we use ReplaySubject here to reload the view of the template everytime there is one letter search
  private searchGroups = new ReplaySubject<string>(1);

  ngOnInit(): void {
    this.groups$ = this.searchGroups.pipe(
      // waits 300ms after each keystroke before considering the term
      tap(value => console.log(value)),
      debounceTime(300),

      // ensures that a request is sent only if the filter text changed
      distinctUntilChanged(),

      // calls the search service for each search term that makes it through debounce() and distinctUntilChanged().
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.groupService.searchGroups(term))
    );

  }

  // this function force our subject searchGroups to contain the search term
  search(term: string): void {
    console.log(term);
    this.searchGroups.next(term);
  }

  onFocusOut(): void {
    // if we don't click on one of the result in the list, the search bar is initialized
    document.addEventListener('click', (event) => {
      console.log('results list loose focus', event.target);
      // if we click on a link from the results list
      if ((event.target as HTMLElement).closest('ul')) {
        return;
      } // if we click on the input bar
      else if ((event.target as HTMLElement).id === 'search-box') {
        (event.target as HTMLInputElement).focus();
        return;
      } // if we click anywhere else, initialize the search bar
      (document.getElementById('search-box') as HTMLInputElement).value = '';
    });
  }
}
