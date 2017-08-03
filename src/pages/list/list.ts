import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/historyProvider';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private historyWordList:any;
  private historyList:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, history:HistoryProvider) { 

    history.load('history',{})
      .then((data) => { 
        if(data){
          this.historyWordList = Object.keys(data);        
          this.historyList = data;
        }
      });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
