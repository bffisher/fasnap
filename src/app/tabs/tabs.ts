import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { NavigationPage } from '../list/navigation';
import { AboutPage } from '../about/about';
import { ListEvent } from '../service/event/list.event';
import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
  providers: [ListEvent]
})
export class TabsPage {
  @ViewChild('myTabs') 
  tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = NavigationPage;
  tab3Root = AboutPage;

  constructor(private listEvent: ListEvent) {
    this.listEvent.itemClickedSource$.subscribe((item) => {
      this.tabRef.select(0);
    })
  }
}