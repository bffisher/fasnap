import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { TabsPage } from './tabs/tabs'
import { HomePage } from './home/home';
import { HistoryPage } from './history/history';
import { AboutPage } from './about/about';

import { DBService } from './service/db.service';
import { DataService } from './service/data.service';
import { ChartsService } from './service/charts.service';

@NgModule({
  declarations: [MyApp, TabsPage, HomePage, HistoryPage, AboutPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage, HomePage, HistoryPage, AboutPage],
  providers: [
    StatusBar, SplashScreen, SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DBService, DataService, ChartsService
  ]
})
export class AppModule { }