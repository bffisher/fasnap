import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditAssetItemPage } from './assetItem'
//import { DataService } from '../service/data.service';
import { AssetItemEntity } from '../service/entity/assetItem.entity';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { Util } from '../service/util';

@Component({
  templateUrl: 'snapshot.html'
})
export class EditSnapshotPage {
  snapshot: SnapshotEntity;
  items: AssetItemEntity[];
  editedItem: AssetItemEntity;
  addedItem: AssetItemEntity;

  constructor(public navCtrl: NavController/*, private dataServ: DataService*/) {
    this.snapshot = {
      date: Util.date2str(new Date(2011, 1, 1)),
      amount: 0
    };

    this.items = [];
  }

  ionViewDidEnter() {
    if (this.addedItem) {
      this.items.push(this.addedItem);
    }

    this.editedItem = null;
    this.addedItem = null;
  }

  add() {
    this.addedItem = {
      date: this.snapshot.date,
      no: this.items.length,
      platform: 'bank',
      risk: "low",
      term: 'current',
      name: '',
      amount: null
    }
    this.navEditAssetItemPage(this.addedItem);
  }

  itemSelected(item: AssetItemEntity) {
    this.editedItem = item;
    this.navEditAssetItemPage(item);
  }

  navEditAssetItemPage(item: AssetItemEntity) {
    this.navCtrl.push(EditAssetItemPage, { item: item });
  }
}