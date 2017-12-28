import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';

import { DataService } from '../service/data.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { ListEvent } from '../service/event/list.event';
import { EditSnapshotPage } from '../edit/snapshot';
import { ActionSheetController, AlertController } from 'ionic-angular';
import { LangPackage } from '../i18n/langPackage';

@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  editedItem: SnapshotEntity;
  addedItem: SnapshotEntity;
  items: SnapshotEntity[];

  constructor(
    private nav: NavController,
    public actionsheet: ActionSheetController,
    public alert: AlertController,
    private dataServ: DataService,
    private lang: LangPackage,
    private listEvent: ListEvent
  ) {
  }

  ionViewDidLoad() {
    this.items = [];
    this.dataServ.getSnapshotList(null, null, true).then((res) => {
      this.items = res;
    })
  }

  ionViewDidEnter() {
    if (this.addedItem && this.addedItem.date) {
      let len = this.items.length;
      for(let i = 0; i < len; i++){
        if(this.addedItem.date >= this.items[i].date){
          this.items.splice(i, 0, this.addedItem);
          break;
        }
      }

      if(this.items.length === len){
        this.items.push(this.addedItem);
      }

      this.listEvent.itemAdded(this.addedItem);
    }
    
    if(this.editedItem){
      this.listEvent.itemModified(this.editedItem);
    }

    this.editedItem = null;
    this.addedItem = null;
  }

  itemClicked(item: SnapshotEntity) {
    let actionSheetImp = this.actionsheet.create({
      title: this.lang.get('TITLE.OPTIONS'),
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: this.lang.get('BUTTON.OVERVIEW'),
          handler: () => {
            this.listEvent.itemClicked(item);
          }
        },
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
          }
        }
      ]
    });
    actionSheetImp.present();
  }

  add() {
    if(this.items.length === 0){
      this.addedItem = this.dataServ.newSnapshot();
    }else{
      this.addedItem = this.dataServ.cloneSnapshot(this.items[0]);
      this.addedItem.date = null;
    }
    this.nav.push(EditSnapshotPage, { item: this.addedItem });
  }

  edit(item) {
    this.editedItem = item;
    this.nav.push(EditSnapshotPage, { item: item });
  }

  del(item) {
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
            this.dataServ.deleteSnapshot(item.date).then(() => {
              let index4del = -1;
              for (let i = 0; i < this.items.length; i++) {
                if (this.items[i] === item) {
                  index4del = i;
                }
              }

              if (index4del >= 0) {
                let deletedItem = this.items.splice(index4del, 1)[0];
                this.listEvent.itemDeleted(deletedItem);
              }
            });
          }
        }
      ]
    });
    alertImp.present();
  }
}