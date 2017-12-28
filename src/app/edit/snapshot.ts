import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { EditAssetItemPage } from './assetItem'
import { DataService } from '../service/data.service';
import { AssetItemEntity } from '../service/entity/assetItem.entity';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { Util } from '../service/util';
import { LangPackage } from '../i18n/langPackage';

@Component({
  templateUrl: 'snapshot.html'
})
export class EditSnapshotPage {
  isDateEnable: boolean;
  originSnapshot: SnapshotEntity
  snapshot: SnapshotEntity;
  editedAssetItem: AssetItemEntity;
  addedAssetItem: AssetItemEntity;

  constructor(
    public navCtrl: NavController,
    public actionsheet: ActionSheetController,
    public alert: AlertController,
    public navParams: NavParams,
    private lang: LangPackage,
    private dataServ: DataService
  ) {
    this.originSnapshot = this.navParams.get('item');

    this.snapshot = this.dataServ.cloneSnapshot(this.originSnapshot);

    if (this.snapshot.date) {
      //modify
      this.isDateEnable = false;
    } else {
      //add
      this.snapshot.date = Util.date2str(new Date());
      this.isDateEnable = true;
    }
  }

  ionViewDidEnter() {
    if (this.addedAssetItem && this.addedAssetItem.name) {
      this.snapshot.assetItems.push(this.addedAssetItem);
    }

    this.editedAssetItem = null;
    this.addedAssetItem = null;

    this.calculateAmount();
  }

  calculateAmount() {
    this.snapshot.amount = 0;
    for (let i = 0; i < this.snapshot.assetItems.length; i++) {
      this.snapshot.amount += this.snapshot.assetItems[i].amount;
    }
  }

  itemSelected(item: AssetItemEntity) {
    let actionSheetImp = this.actionsheet.create({
      title: this.lang.get('TITLE.OPTIONS'),
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: this.lang.get('BUTTON.EDIT'),
          handler: () => {
            this.edit(item);
          }
        },
        {
          text: this.lang.get('BUTTON.DELETE'),
          handler: () => {
            this.del(item);
          }
        },
        {
          text: this.lang.get('BUTTON.CANCEL'),
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheetImp.present();
  }

  save() {
    if (this.isDateEnable) {
      //add mode
      this.dataServ.getSnapshotList(this.snapshot.date).then((res) => {
        if (res && res.length > 0) {
          //exist
          let alertImp = this.alert.create({
            subTitle: this.lang.get('TEXT.DATE_SNAPSHOT_EXIST_INFO', this.snapshot.date),
            buttons: [
              {
                text: this.lang.get('BUTTON.OK'),
              }]
          });
          alertImp.present();
        } else {
          this.doSave();
        }
      });
    } else {
      this.doSave();
    }
  }

  doSave() {
    this.dataServ.saveSnapshot(this.snapshot).then(() => {
      this.originSnapshot.date = this.snapshot.date;
      this.originSnapshot.amount = this.snapshot.amount;
      this.originSnapshot.assetItems = this.snapshot.assetItems;
      this.navCtrl.pop();
    });
  }

  add() {
    var lastNo = 0;
    if (this.snapshot.assetItems.length > 0) {
      lastNo = this.snapshot.assetItems[this.snapshot.assetItems.length - 1].no + 1;
    }
    this.addedAssetItem = {
      date: this.snapshot.date,
      no: lastNo,
      platform: 'bank',
      risk: "low",
      term: 'current',
      name: '',
      amount: null
    }
    this.navEditAssetItemPage(this.addedAssetItem);
  }

  private edit(item: AssetItemEntity) {
    this.editedAssetItem = item;
    this.navEditAssetItemPage(item);
  }

  private del(item: AssetItemEntity) {
    let alertImp = this.alert.create({
      //title: 'Warn!',
      subTitle: this.lang.get('TEXT.DELETE_CONFIRM'),
      buttons: [
        {
          text: this.lang.get('BUTTON.CANCEL'),
          handler: data => {
          }
        },
        {
          text: this.lang.get('BUTTON.OK'),
          handler: data => {
            let index4del = -1;
            for (let i = 0; i < this.snapshot.assetItems.length; i++) {
              if (this.snapshot.assetItems[i] === item) {
                index4del = i;
              }
            }

            if (index4del >= 0) {
              this.snapshot.assetItems.splice(index4del, 1);
              this.calculateAmount();
            }
          }
        }
      ]
    });
    alertImp.present();
  }

  private navEditAssetItemPage(item: AssetItemEntity) {
    this.navCtrl.push(EditAssetItemPage, { item: item });
  }
}