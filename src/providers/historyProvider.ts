import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
Generated class for the History provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
  */
@Injectable()
export class HistoryProvider {
  protected historyKey:string;
  constructor(private storage:Storage) {
    this.historyKey = "history"
  }
  
  toObject(arr) {
    if(arr == null){
      return {};
    }

    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = arr[i];
    return rv;
  }
  
  toArray(obj){
    return Object.keys(obj);
  }
  
  public wordClean(word:string){
    if(!word){
      return null;
    }
    word = word.trim();
    return word;
  }
  
  
  public save(data) {
    //  this.store(this.historyKey,data);
  }
  
  // check mean exit 
  protected updateMean(word:string, mean:string){
    // console.log('mad_msg__word',word);
    // console.log('mad_msg__mean',mean);
    
    let allMeanArr:any = []
    let allMeanObj:any = {}
    this.load(word,{})
    .then(reponse => {
      if(reponse){
        allMeanArr = reponse;
        allMeanObj =  this.toObject(allMeanArr);
        // check mean in array
        if(!allMeanObj[mean]) {
          allMeanArr.push(mean);
          this.store(word,allMeanArr);
        }
      }
      else {
        allMeanArr.push(mean);
        this.store(word,allMeanArr);
      }
    })
  }
  
  
  protected store(key:string, saveData:any){
    this.storage.set(key,JSON.stringify(saveData));
  }
  
  public add(word, mean) { 
    console.log('mad_msg__word,mean',word,mean);
    
    // check exist 
    this.storage.get('history').then((historyRowData:any) => {
      // Check local storage emtpty
      if(historyRowData){
        // get all local history
        let historyJsondata = JSON.parse(historyRowData);
        let historyObj = this.toObject(historyJsondata);
        // check word is exist
        if(!historyObj[word]) { 
          // add to history
          historyJsondata.push(word);
        }
        // check word is exist
        this.store(this.historyKey,historyJsondata);
        this.updateMean(word, mean);
      }
      // add first record
      else{
        let wordData = [word];
        let meanData = [mean];
        this.store(this.historyKey,wordData);
        this.store(word,meanData);
      }
      
      
    });
    
    //  this.store(this.historyKey,data);
  }
  load(key:string, Default:any) {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then((data) => {
        resolve(JSON.parse(data));
      })
      .catch(() => {
        console.log("HistoryProvider------------>>Load DEFAULTS", Default);
        resolve(Default);
      });
    }); 
  }
  
  protected delete(key:string, Default:any){
    return new Promise((resolve, reject) => {
      this.storage.remove(key).then(response =>{
        resolve(true);
      })
      .catch((error)=>{
        console.error('mad_msg__not error delted',error);
        resolve(false)
      });
    })
  }
  // remove selected word
  protected removeFromHistory(word:string) {
    return new Promise((resolve, reject) => {
      // list all histroy
      this.load('history',[]).then(historyArr=>{
        let historyObj = this.toObject(historyArr);
        // is exist in history
        if(historyObj[word]){
          // remove word from history
          delete(historyObj[word]);
          // convert to array
          let newHistoryArr = Object.keys(historyObj);
          // store in local
          this.store(this.historyKey,newHistoryArr);
          resolve(true);
        }
        reject('not found word')
      });
      
    });
  }
  
  // remove selected word
  protected updateFromMean(word:string, mean:string, remove:boolean) {
    return new Promise((resolve, reject) => {
      // list all means
      this.load(word,[]).then(meanArr=>{ 
        let meanObj = this.toObject(meanArr);
        if(remove){
          delete(meanObj[mean]);
        }
        let newMeanArr = this.toArray(meanObj);
        // this if condition should be done before remove the mean list
        if(newMeanArr.length==0){
          this.removeFromHistory(word);
          resolve(true)
        }
        this.store(word,newMeanArr);
        resolve(true);
      });
      
    });
  }
  
  public clear(word:string, mean:string){
    
    word =  this.wordClean(word);
    mean =  this.wordClean(mean); 
    
    // remove all means with word
    if(word && mean){
      this.updateFromMean(word, mean, true);
    }
    // word with mean remove each mean
    else if(word && !mean){
      //Todo:: add to promise
      this.removeFromHistory(word);
    }
    else{
      this.delete(this.historyKey,false);
    }
    
  }
  
}
