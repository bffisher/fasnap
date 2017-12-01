
import { Injectable } from '@angular/core';
import { SnapshotEntity } from './entity/snapshot.entity';
import { ItemEntity } from './entity/item.entity'
import { CategoryEntity } from './entity/category.entity';
import { DBService } from './db.service';

@Injectable()
export class DataService {
  constructor(private dbServ: DBService) {

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

  getItems(date: Date): ItemEntity[] {
    return [
      { date: new Date(2016, 11, 8), no: 1, platform: 'bank', risk: 'low', term: 'current', name: 'xxxx', amount: 10000 },
      { date: new Date(2016, 11, 8), no: 2, platform: 'internet', risk: 'middle', term: 'short', name: 'xxxx', amount: 2000 },
      { date: new Date(2016, 11, 8), no: 3, platform: 'securities', risk: 'height', term: 'current', name: 'xxxx', amount: 333 }
    ]
  }

  getCategories(type: string): CategoryEntity[] {
    switch (type) {
      case 'platform':
        return [
          { type: type, value: 'bank', name: 'Bank' },
          { type: type, value: 'internet', name: 'Internet' },
          { type: type, value: 'securities', name: 'Securities' },
          { type: type, value: 'other', name: 'Other' }
        ];
      case 'risk':
        return [
          { type: type, value: 'low', name: 'Low' },
          { type: type, value: 'middle', name: 'Middle' },
          { type: type, value: 'height', name: 'Height' }
        ];
      case 'term':
        return [
          { type: type, value: 'current', name: 'Current' },
          { type: type, value: 'short', name: 'Short' },
          { type: type, value: 'middle', name: 'Middle' },
          { type: type, value: 'long', name: 'Long' }
        ];
    }
  }
}