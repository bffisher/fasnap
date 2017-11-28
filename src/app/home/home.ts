import { Component, AfterViewInit } from '@angular/core';
import ECharts from 'echarts';

import { DataService } from '../service/data.service';
import { ChartsService } from '../service/charts.service';
import { SnapshotEntity } from '../service/entity/snapshot.entity';
import { HistoryEvent } from '../service/event/history.event';

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  private curDate: Date;
  private curAmount: number;
  private pieChart: ECharts.ECharts;
  private lineChart: ECharts.ECharts;

  constructor(private dataServ: DataService, private chartsServ: ChartsService, private historyEvent: HistoryEvent) {
    var lastSnapshot: SnapshotEntity = this.dataServ.getLastSnapshot();
    if (lastSnapshot) {
      this.curDate = lastSnapshot.date;
      this.curAmount = lastSnapshot.amount;
    } else {
      this.curDate = new Date();
      this.curAmount = 0;
    }

    this.historyEvent.itemClickedSource$.subscribe((item) => {
      this.curDate = item.date;
      this.curAmount = item.amount;
      this.rendPieChart('platform');
      this.rendLineChart();
    })
  }

  ngAfterViewInit() {
    this.pieChart = ECharts.init(<HTMLCanvasElement>document.getElementById('pieChart'));
    this.rendPieChart('platform');

    this.lineChart = ECharts.init(<HTMLCanvasElement>document.getElementById('lineChart'));
    this.rendLineChart();
  }

  gotoPrevDate() {
    var snapshot: SnapshotEntity = this.dataServ.getPrevSnapshot(this.curDate);
    if (snapshot) {
      this.curDate = snapshot.date;
      this.curAmount = snapshot.amount;
    }
  }

  gotoNextDate() {
    var snapshot: SnapshotEntity = this.dataServ.getNextSnapshot(this.curDate);
    if (snapshot) {
      this.curDate = snapshot.date;
      this.curAmount = snapshot.amount;
    }
  }

  rendPieChart(type: string) {
    this.pieChart.setOption(this.chartsServ.getPieOptions(this.curDate, type));
  }

  rendLineChart() {
    this.lineChart.setOption(this.chartsServ.getLineOptions(this.curDate));
  }
}