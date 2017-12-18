
import { Injectable } from '@angular/core';
import { SnapshotEntity } from './entity/snapshot.entity';
import { AssetItemEntity } from './entity/assetItem.entity'
import { CategoryItemEntity } from './entity/categoryItem.entity';
// import { DBService } from './db.service';

@Injectable()
export class DataService {
  constructor(/*private dbServ: DBService*/) {

  }

  getLastSnapshot(): SnapshotEntity {
    return { date: new Date(2017, 0, 8), amount: 111111 };
  }

  getPrevSnapshot(date: Date): SnapshotEntity {
    return { date: new Date(2016, 11, 8), amount: 101111 };
  }

  getNextSnapshot(date: Date): SnapshotEntity {
    return { date: new Date(2017, 1, 8), amount: 121111 };
  }

  getSnapshotList(pageSize: number, pageIndex: number): SnapshotEntity[] {
    return [
      { date: new Date(2016, 11, 8), amount: 101111 },
      { date: new Date(2017, 0, 8), amount: 111111 },
      { date: new Date(2017, 1, 8), amount: 221111 }
    ];
  }

  getAssetItems(date: Date): AssetItemEntity[] {
    return [
      { date: new Date(2016, 11, 8), no: 1, platform: 'bank', risk: 'low', term: 'current', name: 'xxxx', amount: 10000 },
      { date: new Date(2016, 11, 8), no: 2, platform: 'internet', risk: 'middle', term: 'short', name: 'xxxx', amount: 2000 },
      { date: new Date(2016, 11, 8), no: 3, platform: 'securities', risk: 'height', term: 'current', name: 'xxxx', amount: 333 }
    ]
  }

  getCategory(type: string): CategoryItemEntity[] {
    switch (type) {
      case 'platform':
        return [
          { value: 'bank', name: 'Bank' },
          { value: 'internet', name: 'Internet' },
          { value: 'securities', name: 'Securities' },
          { value: 'other', name: 'Other' }
        ];
      case 'risk':
        return [
          { value: 'low', name: 'Low' },
          { value: 'middle', name: 'Middle' },
          { value: 'height', name: 'Height' }
        ];
      case 'term':
        return [
          { value: 'current', name: 'Current' },
          { value: 'short', name: 'Short' },
          { value: 'middle', name: 'Middle' },
          { value: 'long', name: 'Long' }
        ];
    }
  }
}