import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dictionery } from '../../providers/dictionery';
import { HistoryProvider } from '../../providers/historyProvider'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  private dic: any;
  private wordlist : any;
  historyWordList : any;
  historyList : any;
  private selecteWords : any;
  constructor(public navCtrl: NavController, private history:HistoryProvider,dicServise:Dictionery) {
     dicServise.load().then((data) => {
        this.wordlist = data;
     }); 
    this.dic = {}
    this.selecteWords = []; 
  }
  protected browesWord(word:string) : any{
    return this.wordlist[word];
  }

  emptyWordList(){
    this.selecteWords = [];
  }

  // added to the history
  wordSelected (mean: string){ 
    let word = this.dic.find
    word = this.history.wordClean(word);
    this.history.add(word, mean);
  }
  findClear (){
    this.emptyWordList();
    this.dic.find="";
  }

  findword (ev) {
    let word = this.dic.find;
    if(word){
      word = word.trim()
      this.selecteWords = this.browesWord(word);
    }
    // empty resutle
    else {
      this.emptyWordList();
    }
   
  }
}
