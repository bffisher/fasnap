import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { AssetItemEntity } from "./entity/assetItem.entity";
import { SnapshotEntity } from "./entity/snapshot.entity";

@Injectable()
export class ChartsService {
  constructor(private dataServ: DataService) { }

  getPieOptions(items: AssetItemEntity[], type: string) {
    var values = {}, total = 0;

    if (items) {
      for (let i = 0; i < items.length; ++i) {
        let typeVal = items[i][type];
        if (values[typeVal] === undefined) {
          values[typeVal] = 0;
        }
        values[typeVal] += items[i].amount;
        total += items[i].amount;
      }
    }

    var categories = this.dataServ.getCategory(type);
    var names: string[] = [];
    var data = [];
    for (let i = 0; i < categories.length; ++i) {
      let name = categories[i].name;
      let value = values[categories[i].value];
      value = value ? value : 0;
      name = name + '(' + Math.round(value / total * 100) + '%)';
      names.push(name);
      data.push({ name: name, value: value });
    }

    return {
      legend: {
        orient: 'vertical',
        x: 'left',
        data: names,
        top: '15%'
      },
      series: [{
        name: type,
        type: 'pie',
        center: ['70%', '50%'],
        radius: '90%',
        legendHoverLink: false,
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }]
    };
  }

  getLineOptions(date: string): Promise<any> {
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
        xAxis: {
          data: dateList
        },
        yAxis: {
          scale: true
        },
        grid: {
          left: 50,
          top: '10%'
        },
        series: [
          {
            type: 'line',
            hoverAnimation: false,
            legendHoverLink: false,
            data: values
          }
        ]
      }
    });

  }
}