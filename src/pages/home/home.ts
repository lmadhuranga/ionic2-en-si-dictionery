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
  private historyListObj : any;
   
  private selecteMeanList : any;
  constructor(public navCtrl: NavController, private history:HistoryProvider,private dicServise:Dictionery) {
      
    this.dic = {}
    this.historyListObj = {}
    this.selecteMeanList = [];
    this.init();
    //Todo::remove wait and call 
    // setTimeout(() => {
    //   this.dic.find = 'car';
    //   this.findword(null);
    // },1000) 
    
  }
  private historyLoad(){
    //Todo::To convert to promise
    this.history.load(this.history.historyKey,[]).then(historyArr=>{
      console.log('mad_msg__historyArr',historyArr);
      
      this.historyListObj = this.history.toObject(historyArr);
    })
  }
  public init(){
    this.dicServise.load().then((data) => {
        this.wordlist = data;
     });
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

  // added to the history
  wordSelected (mean: string, isRemove:boolean){
    let word = this.dic.find
    word = this.history.wordClean(word);
    if(isRemove){
      this.clear(word, mean, isRemove)
    }
    else{
      this.history.add(word, mean);
    }
    
  }
  findClear (){
    this.emptyWordList();
    this.dic.find="";
  }

  findword (ev) {
    let word = this.dic.find;
    if(word){
      word = word.trim()
      // load the history with mean
      this.history.load(word,[]).then(meanArr=>{
        this.historyLoad()
        this.historyMeanListObj = this.history.toObject(meanArr)
        this.selecteMeanList = this.browesWord(word);
      }); 
    }
    // empty resutle
    else {
      this.emptyWordList();
    } 
  }

  clear(word:string, mean:string, isRemove){
    this.history.clear(word, mean, isRemove).then(response=>{
      console.log('mad_msg__deleted',mean);
    });
  }

  isInHistory(word:string, mean:string){
    return (this.historyMeanListObj[mean]==mean) && (this.historyListObj[word]==word)
  }
}
