import { Injectable } from "@angular/core";

import { StoreSchema } from "./storeSchema";

@Injectable()
export class DBService {
  db: IDBDatabase;
  constructor() {
  }

  open(dbname: string, stores: StoreSchema[]): Promise<any> {
    return new Promise((resolve, reject) => {
      var request: IDBOpenDBRequest = window.indexedDB.open(dbname, 4);

      request.onupgradeneeded = () => {
        var db: IDBDatabase = request.result;
        stores.forEach(element => {
          db.createObjectStore(element.name, element.options);
        });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = function (e) {
        console.error('Open database error.', e);
        reject();
      };
    });
  }

  save(storeName: string, items: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      var tx = this.db.transaction(storeName, 'readwrite');
      var store = tx.objectStore(storeName);
      items.forEach(element => {
        store.put(element);
      });

      tx.oncomplete = function () {
        resolve();
      };

      tx.onerror = () => {
        reject();
      }
    });
  }

  delete(storeName: string, keys: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      var tx = this.db.transaction(storeName, 'readwrite');
      var store = tx.objectStore(storeName);
      keys.forEach(element => {
        store.delete(element);
      });

      tx.oncomplete = function () {
        resolve();
      };

      tx.onerror = () => {
        reject();
      }
    });
  }

  select(storeName: string, range: IDBKeyRange, count: number, direction:IDBCursorDirection = 'next' ): Promise<any> {
    return new Promise((resolve, reject) => {
      var tx = this.db.transaction(storeName, 'readonly');
      var store = tx.objectStore(storeName);
      var request: IDBRequest = store.openCursor(range, direction);

      var result = [], qty = 0;
      request.onsuccess = function (event) {
        var cursor = request.result;
        if (cursor) {
          result.push(cursor.value);
          qty++;
          if(count > 0 && count <= qty){
            resolve(result);
            return;
          }
          cursor.continue();
        }else{
          resolve(result);
        }
      };

      request.onerror = () => {
        reject();
      }
    });
  }

  // saveSnapshot(snapshot: SnapshotEntity, assetItems: AssetItemEntity[]) {
  //   var sqls = [];
  //   sqls.push(['insert into snapshot (date, amount) values(?, ?)', [snapshot.date, snapshot.amount]]);
  //   for (let assetItem of assetItems) {
  //     sqls.push(['insert into item (date, no, platform, risk, term, name, amount) values(?, ?, ?, ?, ?, ?, ?)',
  //       [assetItem.date, assetItem.no, assetItem.platform, assetItem.risk, assetItem.term, assetItem.name, assetItem.amount]]);
  //   }

  // return this.db.sqlBatch(sqls);
  // }

  // insertSnapshot(entity: SnapshotEntity): Promise<any> {
  //   return this.db.executeSql('insert into snapshot (date, amount) values(?, ?)',
  //     [entity.date, entity.amount]);
  //     this.db.sqlBatch()
  // }

  // insertAssetItem(entity: AssetItemEntity): Promise<any> {
  //   return this.db.executeSql('insert into item (date, no, platform, risk, term, name, amount) values(?, ?, ?, ?, ?, ?, ?)',
  //     [entity.date, entity.no, entity.platform, entity.risk, entity.term, entity.name, entity.amount]);
  // }

  // updateSnapshot(entity: SnapshotEntity): Promise<any> {
  // return this.db.executeSql('upate snapshot set amount = ? WHERE date = ?',
  //   [entity.amount, entity.date]);
  // }

  // updateAssetItem(entity: AssetItemEntity): Promise<any> {
  // return this.db.executeSql('upate item set platform = ?, risk = ?, term = ?, name = ?, amount = ? where date = ?, no = ?)',
  //   [entity.platform, entity.risk, entity.term, entity.name, entity.amount, entity.date, entity.no]);
  // }

  // selectLastSnapshot(): Promise<SnapshotEntity> {
  // return this.db.executeSql('SELECT * FROM snapshot ORDER BY date DESC LIMIT 1', {})
  //   .then((res) => {
  //     if (res.rows.count > 0) {
  //       return {
  //         date: res.rows.item(0).date,
  //         amount: res.rows.item(0).amount
  //       };
  //     }
  //   });
  // }

  // selectPrevSnapshot(dateParam: Date): Promise<SnapshotEntity> {
  // return this.db.executeSql('SELECT * FROM snapshot WHERE date < ? ORDER BY date DESC LIMIT 1', [dateParam])
  //   .then((res) => {
  //     if (res.rows.count > 0) {
  //       return {
  //         date: res.rows.item(0).date,
  //         amount: res.rows.item(0).amount
  //       };
  //     }
  //   });
  // }

  // selectNextSnapshot(dateParam: Date): Promise<SnapshotEntity> {
  // return this.db.executeSql('SELECT * FROM snapshot WHERE date > ? ORDER BY date LIMIT 1', [dateParam])
  //   .then((res) => {
  //     if (res.rows.count > 0) {
  //       return {
  //         date: res.rows.item(0).date,
  //         amount: res.rows.item(0).amount
  //       };
  //     }
  //   });
  // }

  // selectSnapshotList(count: number, dateParam: string): Promise<SnapshotEntity[]> {
  //   if (!dateParam) {
  //     dateParam = '9999-99-99';
  //   }

  // return this.db.executeSql('SELECT * FROM snapshot WHERE date < ? ORDER BY date DESC LIMIT ?', [dateParam, count])
  //   .then((res) => {
  //     if (res.rows.count > 0) {
  //       let entities: SnapshotEntity[] = [];
  //       for (let i = 0; i < res.rows.count; ++i) {
  //         entities.push({
  //           date: res.rows.item(i).date,
  //           amount: res.rows.item(i).amount
  //         });
  //       }
  //       return entities;
  //     }
  //   });
  // }

  // selectAssetItems(dateParam: string): Promise<AssetItemEntity[]> {
  // return this.db.executeSql('SELECT * FROM item WHERE date = ?', [dateParam]).then((res) => {
  //   if (res.rows.count > 0) {
  //     let items: AssetItemEntity[] = [];
  //     for (let i = 0; i < res.rows.count; ++i) {
  //       items.push({
  //         date: dateParam,
  //         no: res.rows.item(i).no,
  //         platform: res.rows.item(i).platform,
  //         risk: res.rows.item(i).risk,
  //         term: res.rows.item(i).term,
  //         name: res.rows.item(i).name,
  //         amount: res.rows.item(i).amount
  //       });
  //     }
  //     return items;
  //   }
  // });
  // }
}