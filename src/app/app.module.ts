import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ChartModule } from 'angular2-highcharts'

import { MyApp } from './app.component';
import { TabsPage } from './tabs/tabs'
import { HomePage } from './home/home';

@NgModule({
  declarations: [MyApp, TabsPage, HomePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), ChartModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }