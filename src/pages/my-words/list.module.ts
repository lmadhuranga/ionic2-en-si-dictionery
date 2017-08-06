import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWordsList } from './list';

@NgModule({
  declarations: [
    MyWordsList,
  ],
  imports: [
    IonicPageModule.forChild(MyWordsList),
  ],
})
export class ListModule {}
