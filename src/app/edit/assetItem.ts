import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../service/data.service';
import { AssetItemEntity } from '../service/entity/assetItem.entity';
import { CategoryItemEntity } from '../service/entity/categoryItem.entity';

@Component({
  templateUrl: 'assetItem.html'
})
export class EditAssetItemPage {
  isOKEnabled: boolean = true;
  orignItem: AssetItemEntity;
  item: AssetItemEntity;

  platfomrs: CategoryItemEntity[]
  risks: CategoryItemEntity[]
  terms: CategoryItemEntity[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServ: DataService) {
    this.orignItem = this.navParams.get('item');

    this.item = {
      date: this.orignItem.date,
      no: this.orignItem.no,
      platform: this.orignItem.platform,
      risk:  this.orignItem.risk,
      term:  this.orignItem.term,
      name: this.orignItem.name,
      amount: this.orignItem.amount
    };

    this.platfomrs = this.dataServ.getCategory('platform');
    this.risks = this.dataServ.getCategory('risk');
    this.terms = this.dataServ.getCategory('term');
  }

  ok() {
    this.orignItem.platform = this.item.platform;
    this.orignItem.risk = this.item.risk;
    this.orignItem.term = this.item.term;
    this.orignItem.name = this.item.name;
    this.orignItem.amount = this.item.amount;

    this.navCtrl.pop();
  }
}