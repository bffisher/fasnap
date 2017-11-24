import { Component } from '@angular/core';

@Component({
  templateUrl: 'history.html'
})
export class HistoryPage {
  items;

  constructor() {
    this.items = ['2017-11-08', '2017-10-08', '2017-09-08', '2017-08-08']
  }

  itemSelected(item) {
    console.log(item);
  }
}