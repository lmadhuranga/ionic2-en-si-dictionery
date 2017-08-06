import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dictionery } from '../../providers/dictionery';
import { HistoryProvider } from '../../providers/historyProvider';
import { ToastProvider } from '../../providers/toast-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  word: any;
  private dic: any;
  private wordlist: any;
  private historyMeanListObj: any;
  private historyListObj: any;

  private selecteMeanList: any;
  constructor(public navCtrl: NavController,
    private history: HistoryProvider,
    private dicServise: Dictionery,
    private toast: ToastProvider) {
      
    this.dic = {}
    this.historyListObj = {}
    this.selecteMeanList = [];
    this.init();
  }
  private historyLoad() {
    //Todo::To convert to promise
    this.history.load(this.history.historyKey, []).then(historyArr => {
      this.historyListObj = this.history.toObject(historyArr);
    })
  }
  public init() {
    this.dicServise.all().then((data) => {
      this.wordlist = data;
    });
  }

  protected browesWord(word: string): any {
    if (word && word.trim() != '') {
      return this.wordlist[word];
    }
  }

  emptyWordList() {
    this.selecteMeanList = [];
  }

  // added to the history
  wordSelected(mean: string, isRemove: boolean) {
    let word = this.history.wordClean(this.dic.find);
    word = this.history.wordClean(word);
    if (isRemove) {
      this.clear(word, mean, isRemove)
    }
    else {
      this.history.add(word, mean);
    }

  }

  recordTypeWord(word: string) {
    this.history.saveFinderWords(word);
  }

  finderClear(ev) {
    this.recordTypeWord(this.dic.find)
    this.dic.find = "";
    this.emptyWordList();
  }
  finderClear2(ev) {
    this.dic.find = "";
    this.emptyWordList();
  }

  /*newFind(word:string){
    let newWordlistArr = Object.keys(this.wordlist);
    this.wordlist = newWordlistArr.filter((item) => {
      return (item.toLowerCase().indexOf(word.toLowerCase()) > -1);
    });
    console.log('mad_msg__this.wordlist',this.wordlist);
    
  }*/

  findword(ev) {
    let word = this.history.wordClean(this.dic.find);
    if (word) {
      // load the history with mean
      this.history.load(word, []).then(meanArr => {
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

  clear(word: string, mean: string, isRemove) {
    this.history.clear(word, mean, isRemove).then(response => {
      console.log('mad_msg__deleted', response);
    });
  }

  isInHistory(word: string, mean: string) {
    return (this.historyMeanListObj[mean] == mean) && (this.historyListObj[word] == word)
  }

  // Added to local storage needupdate 
  needToUpdate(ev) {
    let word = this.history.wordClean(this.dic.find);
    if (this.dicServise.needToBeUpdateSave(word)) {
      this.finderClear(ev)
      this.toast.show('Word will updated');

    }
  }
}
