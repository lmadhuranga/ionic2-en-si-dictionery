import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ToastProvider {
  protected position: string;
  protected duration: number;
  constructor(public http: Http, private toastCtrl: ToastController) {
    this.duration = 3000;
    this.position = 'top';
  }

  show(msg: string) {
    return new Promise((resolve, reject) => {
      if (!msg) {
        reject('invalid message')
      }
      let toast = this.toastCtrl.create({
        message: msg,
        duration: this.duration,
        position: this.position
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      resolve(true);
    });
  }
}
