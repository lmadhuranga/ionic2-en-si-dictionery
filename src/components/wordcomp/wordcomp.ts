import { Component } from '@angular/core';
// import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the Wordcomp component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'word-comp',
  template: `<ion-item-divider (click)="goTranslate(word)"  color="light">
              {{ word }}
            </ion-item-divider>`,
  inputs: ['word'],
})
export class Wordcomp {
  // private word:string;
  constructor() {
  }

  goTranslate(selectedWord: string) {
    console.log('mad_msg__word', selectedWord);
  }
}