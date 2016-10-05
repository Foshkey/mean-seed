import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AppRoutingModule } from './app.routing';

import { CharacterService } from './common/character.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    TopBarComponent
  ],
  providers: [
    CharacterService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
