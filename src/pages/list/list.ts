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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private history:HistoryProvider) { 
    this.load();
    this.historyMeanList= {};
  }

  protected load(){
    this.history.load('history',[])
      .then((data) => { 
        if(data){
          this.historyWordList = data;
          
          if(this.historyWordList.length>0){
            //get each mean list   
            this.historyWordList.forEach(word => {
              this.history.load(word,[]).then(meanarray =>{
                console.log('mad_msg__meanarray',meanarray);
                this.historyMeanList[word] = meanarray;
              })
            });
          }
          
        }
      });
  }

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
