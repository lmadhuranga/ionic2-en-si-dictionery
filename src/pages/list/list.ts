import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/historyProvider';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private historyWordList:any;
  private historyMeanList:any;
  protected historyKey:string = 'history';
  constructor(public navCtrl: NavController, public navParams: NavParams,private history:HistoryProvider) { 
    this.load();
    this.historyMeanList= {};
    
  }

  protected load(){
    // get all history
    this.history.load(this.historyKey,[])
      .then((data) => { 
        if(data){
          this.historyWordList = data;
          if(this.historyWordList.length>0){
            //get each mean list   
            this.historyWordList.forEach(word => {
              // get mean array
              this.history.load(word,[]).then(meanarray =>{
                // get word for means
                this.historyMeanList[word] = meanarray;
              })
            });
          }
          
        }
      });
  }
  // array convert to object
  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = arr[i];
    return rv;
  }

  public wordClean(word:string){
    if(!word){
      return null;
    }
    word = word.trim();
    return word;
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  clear(word:string, mean:string ){
    this.history.clear(word, mean);
  }
}
