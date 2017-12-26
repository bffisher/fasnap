import { Component, AfterViewInit } from '@angular/core';
import ECharts from 'echarts';

import { DataService } from '../service/data.service';
import { ChartsService } from '../service/charts.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { ListEvent } from '../service/event/list.event';
import { Util } from '../service/util';

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
        this.curSnapshot = result;
      } else {
        this.curSnapshot = {
          date: Util.date2str(new Date()),
          amount: 0,
          assetItems: []
        };
      }
      this.rendPieChart('platform');
      this.rendLineChart();
    });

    this.listEvent.itemClickedSource$.subscribe((item) => {
      this.curSnapshot = item;
      this.rendPieChart('platform');
      this.rendLineChart();
    })
  }

  gotoPrevDate() {
    this.dataServ.getPrevSnapshot(this.curSnapshot.date).then((res) => {
      if (res) {
        this.curSnapshot = res;
        this.rendPieChart('platform');
        this.rendLineChart();
      }
    });
  }

  gotoNextDate() {
    this.dataServ.getNextSnapshot(this.curSnapshot.date).then((res) => {
      if (res) {
        this.curSnapshot = res;
        this.rendPieChart('platform');
        this.rendLineChart();
      }
    });
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