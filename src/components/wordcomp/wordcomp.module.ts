import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Wordcomp } from './wordcomp';

@NgModule({
  declarations: [
    Wordcomp,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    Wordcomp
  ]
})
export class WordcompModule {}
