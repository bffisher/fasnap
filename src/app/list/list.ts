import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';

import { DataService } from '../service/data.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { ListEvent } from '../service/event/list.event';
import { EditSnapshotPage } from '../edit/snapshot';
import { ActionSheetController, AlertController } from 'ionic-angular';

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
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Overview',
          handler: () => {
            this.listEvent.itemClicked(item);
          }
        },
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