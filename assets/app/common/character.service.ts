import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Character } from '../models/character';

@Injectable()
export class CharacterService {

  private charUrl = 'api/char';
  private cachedCharacter: Character;

  constructor(
    private http: Http
  ) { }

  getChar(): Promise<Character> {
    if (this.cachedCharacter) {
      return new Promise<Character>(resolve => resolve(this.cachedCharacter));
    }
    else {
      return this.http.get(this.charUrl)
        .toPromise()
        .then(response => {
          this.cachedCharacter = response.json();
          return this.cachedCharacter;
        })
        .catch(this.handleError);
    }
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}