import { Component, AfterViewInit } from '@angular/core';
import ECharts from 'echarts';

import { DataService } from '../service/data.service';
import { ChartsService } from '../service/charts.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { ListEvent } from '../service/event/list.event';

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  private curSnapshot: SnapshotEntity;
  private pieChart: ECharts.ECharts;
  private lineChart: ECharts.ECharts;

  constructor(
    private dataServ: DataService,
    private chartsServ: ChartsService,
    private listEvent: ListEvent
  ) {
  }

  ngAfterViewInit() {
    this.pieChart = ECharts.init(<HTMLCanvasElement>document.getElementById('pieChart'));
    this.lineChart = ECharts.init(<HTMLCanvasElement>document.getElementById('lineChart'));

    this.dataServ.getLastSnapshot().then((result) => {
      if (result) {
        this.bindSnapshot(result);
      } else {
        this.bindSnapshot(this.dataServ.newSnapshot());
      }
    });

    this.listEvent.itemClickedSource$.subscribe((item) => {
      this.bindSnapshot(item);
    });

    this.listEvent.itemAddedSource$.subscribe((item) => {
      if (!this.curSnapshot.date) {
        this.bindSnapshot(item);
      }
    });

    this.listEvent.itemModifiedSource$.subscribe((item) => {
      if (this.curSnapshot.date === item.date) {
        this.bindSnapshot(item);
      }
    });

    this.listEvent.itemDeletedSource$.subscribe((item) => {
      if (this.curSnapshot.date === item.date) {
        this.gotoNextDate().then(() => {
          if (this.curSnapshot.date === item.date) {
            //next date snapshot not exits
            this.gotoPrevDate().then(() => {
              if (this.curSnapshot.date === item.date) {
                //prrev date snapshot not exits
                this.bindSnapshot(this.dataServ.newSnapshot());
              }
            });
          }
        });
      }
    });
  }

  gotoPrevDate() {
    if(!this.curSnapshot.date){
      return Promise.resolve();
    }
    return this.dataServ.getPrevSnapshot(this.curSnapshot.date).then((res) => {
      res && this.bindSnapshot(res);
    });
  }

  gotoNextDate() {
    if(!this.curSnapshot.date){
      return Promise.resolve();
    }
    return this.dataServ.getNextSnapshot(this.curSnapshot.date).then((res) => {
      res && this.bindSnapshot(res);
    });
  }

  bindSnapshot(item: SnapshotEntity) {
    this.curSnapshot = item;
    this.rendPieChart('platform');
    this.rendLineChart();
  }

  rendPieChart(type: string) {
    this.pieChart.setOption(this.chartsServ.getPieOptions(this.curSnapshot.assetItems, type));
  }

  rendLineChart() {
    this.chartsServ.getLineOptions(this.curSnapshot.date).then((res) => {
      this.lineChart.setOption(res);
    });
  }
}