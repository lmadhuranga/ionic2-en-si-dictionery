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
      rv[arr[i]] = arr[i];
    return rv;
  }


  public save(data) {
    //  this.storage.set('history',JSON.stringify(data));
  }
  
  public add(newWordData) {     
    // check exist 
    let newWord = Object.keys(newWordData);
    let newWordMean = newWordData[newWord[0]];
    this.storage.get('history').then((rawdata) => {
      // Check local storage emtpty
      if(rawdata){
        let jsondata = JSON.parse(rawdata)
        let wordList = Object.keys(jsondata);
        let existMeanArr=jsondata[newWord[0]];
        // if exist word added new word
        if(existMeanArr){ 
          let existMeanObj = this.toObject(existMeanArr);
          if(existMeanObj[newWordMean])
          {
            console.log('Already word exist'); 
          }
          else{
            existMeanObj[newWordMean] = newWordMean
            let updatedMeanArray = Object.keys(existMeanObj);
            jsondata[newWord[0]] = updatedMeanArray;
          }
          
        }
        // add as new word to history
        else{
          jsondata[newWord[0]] = [newWordData[newWord[0]]]
          
        }
        this.storage.set('history',JSON.stringify(jsondata));
      }
      // add first record
      else{
        let data = {}
        data[newWord[0]] = [newWordData[newWord[0]]]
        this.storage.set('history',JSON.stringify(data));
      }
      
    
    });

    //  this.storage.set('history',JSON.stringify(data));
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

}
