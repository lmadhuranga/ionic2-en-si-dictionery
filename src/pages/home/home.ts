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
  private historyWordList : any;
  private historyList : any;
  private selecteWords : any;
  constructor(public navCtrl: NavController, private history:HistoryProvider,private dicServise:Dictionery) {
     dicServise.load().then((data) => {
        this.wordlist = data;
     }); 
    this.dic = {}
    this.selecteWords = []; 
  }
  protected browesWord(word:string) : any{
    return this.wordlist[word];
  }

  // added to the history
  wordSelected(word: string){ 
    let data  = {}
    data[this.dic.find] = word;
    this.history.add(data);
  }
  clear(){
    this.dic.find="";
  }
  findword () {
    this.selecteWords = this.browesWord(this.dic.find);
  }
}
