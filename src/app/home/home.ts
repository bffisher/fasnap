import { Component } from '@angular/core';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  options;

  constructor() {
    this.options = {
      chart: { type: 'pie' },
      title: { text: 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    }
  }
}