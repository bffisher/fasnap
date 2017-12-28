import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {LangPackage} from './i18n/langPackage';
import { LangPipe } from './i18n/langPipe';

import { MyApp } from './app.component';
import { TabsPage } from './tabs/tabs'
import { HomePage } from './home/home';
import { NavigationPage } from './list/navigation';
import { ListPage } from './list/list';
import { EditSnapshotPage } from './edit/snapshot';
import { EditAssetItemPage } from './edit/assetItem';
import { AboutPage } from './about/about';

import { DBService } from './service/db.service';
import { DataService } from './service/data.service';
import { ChartsService } from './service/charts.service';

var myComponents = [
  MyApp,
  TabsPage,
  HomePage,
  NavigationPage,
  EditSnapshotPage,
  EditAssetItemPage,
  ListPage,
  AboutPage];

@NgModule({
  declarations: [myComponents, LangPipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: myComponents,
  providers: [
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LangPackage, DBService, DataService, ChartsService
  ]
})
export class AppModule { }