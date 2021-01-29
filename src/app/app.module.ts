import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {CharacterService} from './services/character.service';
import {InMemoryDataService} from './services/in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';


const appRoutes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'groups', component: GroupsComponent},
  { path: '', component: CharactersComponent },
  { path: '**', component: CharactersComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    HeaderComponent,
    FooterComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    RouterModule.forRoot(appRoutes),
    RouterModule,
  ],
  providers: [
    CharacterService,
    InMemoryDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
