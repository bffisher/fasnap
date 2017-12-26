import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { AssetItemEntity } from "./entity/assetItem.entity";
import { SnapshotEntity } from "./entity/snapshot.entity";

@Injectable()
export class ChartsService {
  constructor(private dataServ: DataService) { }

  getPieOptions(items: AssetItemEntity[], type: string) {
    var values = {};

    if (items) {
      for (let i = 0; i < items.length; ++i) {
        let typeVal = items[i][type];
        if (values[typeVal] === undefined) {
          values[typeVal] = 0;
        }
        values[typeVal] += items[i].amount;
      }
    }

    var categories = this.dataServ.getCategory(type);
    var names: string[] = [];
    var data = [];
    for (let i = 0; i < categories.length; ++i) {
      names.push(categories[i].name);
      if (values[categories[i].value] === undefined) {
        data.push({ name: categories[i].name, value: 0 });
      } else {
        data.push({ name: categories[i].name, value: values[categories[i].value] });
      }
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: names
      },
      series: [
        {
          name: type,
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
          data: data
        }
      ]
    };
  }

  getLineOptions(date: string):Promise<any> {
    return this.dataServ.getSnapshotList(date, 6).then((result) => {
      var snapshotList: SnapshotEntity[] = result;
      var dateList: string[] = [];
      var values: number[] = [];

      if (snapshotList) {
        for (let i = 0; i < snapshotList.length; ++i) {
          dateList.push(snapshotList[i].date);
          values.push(snapshotList[i].amount);
        }
      }

      return {
        // title: {
        //   text: 'xxxx',
        //   subtext: 'yyy'
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateList
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            // name: 'xxx',
            type: 'line',
            data: values,
            markPoint: {
              data: [
                { type: 'max', name: 'max' },
                { type: 'min', name: 'min' }
              ]
            },
            // markLine: {
            //   data: [
            //     { type: 'average', name: 'average' }
            //   ]
            // }
          }
        ]
      }
    });

  }
}