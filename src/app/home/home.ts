import { Component } from '@angular/core';
import ECharts from 'echarts';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  options;

  constructor() {
  }
  ngAfterViewInit() {
    var myChart1 = ECharts.init(<HTMLCanvasElement>document.getElementById('myChart1'));
    myChart1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['xxx1', 'xxx2', 'xxx3', 'xxx4', 'xxx5']
      },
      series: [
        {
          name: 'xxx1',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'xxx1' },
            { value: 310, name: 'xxx2' },
            { value: 234, name: 'xxx3' },
            { value: 135, name: 'xxx4' },
            { value: 1548, name: 'xxx5' }
          ]
        }
      ]
    });

    var myChart2 = ECharts.init(<HTMLCanvasElement>document.getElementById('myChart2'));
    myChart2.setOption({
      title: {
        text: 'xxxx',
        subtext: 'yyy'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2017/1/8', '2017/2/8', '2017/3/8', '2017/4/8', '2017/5/8', '2017/6/8']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: 'xxx',
          type: 'line',
          data: [110000, 120000, 130000, 136500, 143900, 160000],
          markPoint: {
            data: [
              { type: 'max', name: 'max' },
              { type: 'min', name: 'min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'average' }
            ]
          }
        }
      ]
    });
  }
}