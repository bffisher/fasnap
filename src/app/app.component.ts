import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from './tabs/tabs'
import { DataService } from './service/data.service';
import { LangPackage } from './i18n/langPackage';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    langPackage: LangPackage,
    dataServ: DataService
  ) {
    langPackage.setLang(navigator.language);

    splashScreen.show();
    platform.ready().then(() => {
      dataServ.init().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        this.rootPage = TabsPage;
        setTimeout(() => {
          splashScreen.hide();
        }, 1000);
      });
    });
  }
}