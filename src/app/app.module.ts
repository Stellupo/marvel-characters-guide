import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {CharacterService} from './services/character.service';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';
import {GroupService} from './services/group.service';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { CharaSearchComponent } from './chara-search/chara-search.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { CardsListComponent } from './cards-list/cards-list.component';


const appRoutes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'groups', component: GroupsComponent},
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', redirectTo: 'characters', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    HeaderComponent,
    FooterComponent,
    GroupsComponent,
    GroupDetailComponent,
    CharaSearchComponent,
    GroupSearchComponent,
    CardsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    RouterModule,
  ],
  providers: [
    CharacterService,
    GroupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
