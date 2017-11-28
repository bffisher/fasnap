import { Component } from '@angular/core';

import { DataService } from '../service/data.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { HistoryEvent } from '../service/event/history.event';

@Component({
  templateUrl: 'history.html'
})
export class HistoryPage {
  items: SnapshotEntity[];

  constructor(private dataServ: DataService, private historyEvent: HistoryEvent) {
    this.items = this.dataServ.getSnapshotList(6, 0);
  }

  itemSelected(item) {
    this.historyEvent.itemClicked(item);
  }
}