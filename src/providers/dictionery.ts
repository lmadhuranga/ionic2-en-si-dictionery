import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the Dictionery provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Dictionery {
  private data:any;
  private needToBeUpdateKey:string;
  constructor(public http: Http, private storage:Storage) {
    this.needToBeUpdateKey = '_needToUpdate'
  }
  //Todo::remove Hlper functions
  toObject(arr) {
    if (arr == null) {
      return {};
    }

    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = arr[i];
    return rv;
  }

  toArray(obj) {
    return Object.keys(obj);
  }

  public wordClean(word: string) {
    if (!word) {
      return null;
    }
    word = word.trim();
    word = word.toLowerCase();
    return word;
  }
  //Todo::remove Hlper functions end()
  
  all() {
    // //don't have the data yet
    return new Promise(resolve => {
    //   // We're using Angular HTTP provider to request the data,
    //   // then on the response, it'll map the JSON data to a parsed JS object.
    //   // Next, we process the data and resolve the promise with the new data.
      this.http.get('assets/data/en-si.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.words;
          resolve(this.data);
        });
    });
  }

   // save every word type in finder
  needToBeUpdateSave(word: string) {
    word = this.wordClean(word);
    //Todo::convert to promise
    this.load(this.needToBeUpdateKey, []).then(finderObj=>{
      if(finderObj){
        finderObj[word] = ''
      }
      else{
        finderObj = {};
        if(word){
          finderObj[word] = '';
        }
      }
      return this.store(this.needToBeUpdateKey,finderObj)
    })
  }

  private load(key: string, Default: any) {
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
  protected store(key: string, saveData: any) {
    //Todo::remove
    console.log('mad_msg__store called');
    
    this.storage.set(key, JSON.stringify(saveData));
    return true;
  }
}
