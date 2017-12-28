
import { Injectable } from '@angular/core';
import { SnapshotEntity } from './entity/snapshot.entity';
import { CategoryItemEntity } from './entity/categoryItem.entity';
import { DBService } from './db.service';
import { AssetItemEntity } from './entity/assetItem.entity';
import { LangPackage } from '../i18n/langPackage';

@Injectable()
export class DataService {

  constructor(private dbServ: DBService, private lang: LangPackage) {
  }

  init(): Promise<any> {
    return this.dbServ.open('my.db',
      [{ name: 'snapshot', options: { keyPath: 'date' } }]
    );
  }

  saveSnapshot(snapshot: SnapshotEntity): Promise<any> {
    return this.dbServ.save('snapshot', [snapshot]);
  }

  deleteSnapshot(date: string): Promise<any> {
    return this.dbServ.delete('snapshot', [date]);
  }

  getLastSnapshot(): Promise<SnapshotEntity> {
    return this.dbServ.select('snapshot', null, 1, 'prev').then((res) => {
      return res[0];
    });
  }

  getPrevSnapshot(date: string): Promise<SnapshotEntity> {
    var range: IDBKeyRange = IDBKeyRange.upperBound(date, true);
    return this.dbServ.select('snapshot', range, 1).then((res) => {
      return res[0];
    });
  }

  getNextSnapshot(date: string): Promise<SnapshotEntity> {
    var range: IDBKeyRange = IDBKeyRange.lowerBound(date, true);
    return this.dbServ.select('snapshot', range, 1).then((res) => {
      return res[0];
    });
  }

  getSnapshotList(date: string, count: number = -1, desc: boolean = false): Promise<SnapshotEntity[]> {
    var range: IDBKeyRange = null;
    if (date) {
      range = IDBKeyRange.upperBound(date);
    }

    return this.dbServ.select('snapshot', range, count, desc ? 'prev' : undefined);
  }

  getCategory(type: string): CategoryItemEntity[] {
    switch (type) {
      case 'platform':
        return [
          { value: 'bank', name: this.lang.get('CATEGORY.PLATFORM.BANK') },
          { value: 'internet', name: this.lang.get('CATEGORY.PLATFORM.INTERNET') },
          { value: 'securities', name: this.lang.get('CATEGORY.PLATFORM.SECURITIES') },
          { value: 'other', name: this.lang.get('CATEGORY.PLATFORM.OTHER') }
        ];
      case 'risk':
        return [
          { value: 'low', name: this.lang.get('CATEGORY.RISK.LOW') },
          { value: 'middle', name: this.lang.get('CATEGORY.RISK.MIDDLE') },
          { value: 'height', name: this.lang.get('CATEGORY.RISK.HEIGHT') }
        ];
      case 'term':
        return [
          { value: 'current', name: this.lang.get('CATEGORY.TERM.CURRENT') },
          { value: 'short', name: this.lang.get('CATEGORY.TERM.SHORT') },
          { value: 'middle', name: this.lang.get('CATEGORY.TERM.MIDDLE') },
          { value: 'long', name: this.lang.get('CATEGORY.TERM.LONG') }
        ];
    }
  }

  newSnapshot(): SnapshotEntity {
    return {
      date: null,
      amount: 0,
      assetItems: []
    };
  }

  cloneSnapshot(item: SnapshotEntity): SnapshotEntity {
    var cloneItem = {
      date: item.date,
      amount: item.amount,
      assetItems: []
    };

    item.assetItems.forEach((element) => {
      cloneItem.assetItems.push(this.cloneAssetItem(element));
    });

    return cloneItem;
  }

  cloneAssetItem(item: AssetItemEntity): AssetItemEntity {
    return {
      date: item.date,
      no: item.no,
      platform: item.platform,
      risk: item.risk,
      term: item.term,
      name: item.name,
      amount: item.amount
    };
  }
}