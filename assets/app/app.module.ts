import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CharacterService } from './common/character.service';
import { LandingComponent } from './landing/landing.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    TopBarComponent
  ],
  providers: [
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
