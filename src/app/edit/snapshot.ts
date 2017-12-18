import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditAssetItemPage } from './assetItem'
//import { DataService } from '../service/data.service';
import { AssetItemEntity } from '../service/entity/assetItem.entity';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  templateUrl: 'snapshot.html'
})
export class EditSnapshotPage {
  snapshot: SnapshotEntity

  items: AssetItemEntity[]

  constructor(public navCtrl: NavController/*, private dataServ: DataService*/) {
    this.snapshot = {
      date: new Date(2011,1,1),
      amount: 0
    };

    this.items = [];
  }

  add(){
    var item: AssetItemEntity = {
      date: this.snapshot.date,
      no: this.items.length,
      platform: 'bank',
      risk:  "low",
      term:  'current',
      name: '',
      amount: 0
    }
    this.items.push(item);
    this.itemSelected(item);
  }

  itemSelected(item) {
    this.navCtrl.push(EditAssetItemPage, {item: item});
  }
}