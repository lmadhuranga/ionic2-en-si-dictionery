import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryList } from '../pages/history/list';
import { MyWordsList } from '../pages/my-words/list';

import { Wordcomp } from '../components/wordcomp/wordcomp';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dictionery } from '../providers/dictionery';
import { Favourite } from '../providers/favourite';
import { HistoryProvider } from '../providers/historyProvider';
import { ToastProvider } from '../providers/toast-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryList,
    MyWordsList,
    Wordcomp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryList,
    MyWordsList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dictionery,
    Favourite,
    HistoryProvider,
    ToastProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
