import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { EditIndexPage } from '../edit/index';
import { HistoryPage } from '../history/history';
import { AboutPage } from '../about/about';
import { HistoryEvent } from '../service/event/history.event';
import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
  providers: [HistoryEvent]
})
export class TabsPage {
  @ViewChild('myTabs') 
  tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = EditIndexPage;
  tab3Root = HistoryPage;
  tab4Root = AboutPage;

  constructor(private historyEvent: HistoryEvent) {
    this.historyEvent.itemClickedSource$.subscribe((item) => {
      this.tabRef.select(0);
    })
  }
}