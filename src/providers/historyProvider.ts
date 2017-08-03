import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the History provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  constructor(private storage:Storage) {
  
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }


  public save(data) {
    //  this.storage.set('history',JSON.stringify(data));
  }
  
  public add(newWordData) { 
    console.log('newWordData',newWordData);
    
    // check exist 
    let newWord = Object.keys(newWordData);
    this.storage.get('history').then((rawdata) => {
      if(rawdata){
        let jsondata = JSON.parse(rawdata)
        console.log( 'jsondata',jsondata);
        
        let wordList = Object.keys(jsondata);
        
        let exitWord=jsondata[newWord[0]];
        if(exitWord){
          console.log('exitWord',exitWord);
          
          jsondata[newWord[0]] = exitWord[newWord[0]]; 
        }
        else{
          jsondata[newWord[0]] = [newWordData[newWord[0]]]
          this.storage.set('history',JSON.stringify(jsondata));
        }
      } 
      else{
        let data = {}
        data[newWord[0]] = [newWordData[newWord[0]]]
        this.storage.set('history',JSON.stringify(data));
      }
      
    
    });

    //  this.storage.set('history',JSON.stringify(data));
  }
  public get(){
    this.storage.get('history').then((val) => {
      console.log('Your name is', val);
    });    
  }

}
