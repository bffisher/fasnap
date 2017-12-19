import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { EditAssetItemPage } from './assetItem'
import { DataService } from '../service/data.service';
import { AssetItemEntity } from '../service/entity/assetItem.entity';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { Util } from '../service/util';

@Component({
  templateUrl: 'snapshot.html'
})
export class EditSnapshotPage {
  isDateEnable: boolean;
  originSnapshot: SnapshotEntity
  snapshot: SnapshotEntity;
  items: AssetItemEntity[];
  editedItem: AssetItemEntity;
  addedItem: AssetItemEntity;

  constructor(
      public navCtrl: NavController,
      public actionsheet: ActionSheetController,
      public alert: AlertController,
      public navParams: NavParams,
      private dataServ: DataService
    ) {
    this.snapshot = {
      date: Util.date2str(new Date(2011, 1, 1)),
      amount: 0
    };

    this.originSnapshot = this.navParams.get('item');
    this.snapshot = {
      date: this.originSnapshot.date,
      amount: this.originSnapshot.amount
    }

    if(this.snapshot.date){
      this.items = this.dataServ.getAssetItems(this.snapshot.date);
      this.isDateEnable = false;
    }else{
      this.snapshot = {
        date: Util.date2str(new Date()),
        amount: 0
      }
      this.items = [];
      this.isDateEnable = true;
    }
  }

  ionViewDidEnter() {
    if (this.addedItem) {
      this.items.push(this.addedItem);
    }

    this.editedItem = null;
    this.addedItem = null;

    this.snapshot.amount = 0;
    for(let i = 0; i < this.items.length; i++){
      this.snapshot.amount += this.items[i].amount;
    }
  }

  itemSelected(item: AssetItemEntity) {
    let actionSheetImp = this.actionsheet.create({
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.edit(item);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.del(item);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheetImp.present();
  }

  save(){
    this.originSnapshot.date = this.snapshot.date;
    this.originSnapshot.amount = this.snapshot.amount;
    this.navCtrl.pop();
  }

  add() {
    var lastNo = 0;
    if(this.items.length > 0){
      lastNo = this.items[this.items.length - 1].no + 1;
    }
    this.addedItem = {
      date: this.snapshot.date,
      no: lastNo,
      platform: 'bank',
      risk: "low",
      term: 'current',
      name: '',
      amount: null
    }
    this.navEditAssetItemPage(this.addedItem);
  }

  private edit(item:AssetItemEntity){
    this.editedItem = item;
    this.navEditAssetItemPage(item);
  }

  private del(item:AssetItemEntity){
    let alertImp = this.alert.create({
      //title: 'Warn!',
      subTitle: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
            let index4del = -1;
            for(let i = 0; i < this.items.length; i++){
              if(this.items[i] === item){
                index4del = i;
              }
            }

            if(index4del >= 0){
              this.items.splice(index4del, 1);
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