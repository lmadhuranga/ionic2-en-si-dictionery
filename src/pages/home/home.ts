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
  private historyMeanListObj : any;
   
  private selecteMeanList : any;
  constructor(public navCtrl: NavController, private history:HistoryProvider,dicServise:Dictionery) {
     dicServise.load().then((data) => {
        this.wordlist = data;
     }); 
    this.dic = {}
    this.selecteMeanList = []; 
    //Todo::remove wait and call 
    setTimeout(() => {
      this.dic.find = 'car';
      this.findword(null);
    },1000) 
    
  }
  protected browesWord(word:string) : any{
    if (word && word.trim() != '') {
      return this.wordlist[word];
      // this.wordlist = this.wordlist.filter((result) => {
      //   console.log('mad_msg__resutl',result);
        
      //   // return (word.toLowerCase().indexOf(word.toLowerCase()) > -1);
      // })
    }
  }

  emptyWordList(){
    this.selecteMeanList = [];
  }

  // find the word has saved means
  protected getWordSavedMeans(word:string){
    this.history.load(word, []).then(historyArr =>{ 
      this.historyMeanListObj = this.history.toObject(historyArr);
    })
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
      
      this.getWordSavedMeans(word);
      this.selecteMeanList = this.browesWord(word);
      console.log('mad_msg__this.selecteMeanList',this.selecteMeanList);
      
    }
    // empty resutle
    else {
      this.emptyWordList();
    } 
  }
}
