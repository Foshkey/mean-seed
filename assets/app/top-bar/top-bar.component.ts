import { Component, OnInit } from '@angular/core';

import { Character } from '../models/character';
import { CharacterService } from '../common/character.service';

@Component({
  moduleId: module.id,
  selector: 'app-top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: ['top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  character: Character;
  logoutUrl = '/logout';
  portraitUrl: string;

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characterService.getChar().then(character => {
      this.character = character;
      this.portraitUrl = `//imageserver.eveonline.com/Character/${this.character.CharacterID}_32.jpg`;
    });
  }
}