import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
