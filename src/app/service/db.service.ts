import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { SnapshotEntity } from "./entity/snapshot.entity";
import { AssetItemEntity } from "./entity/assetItem.entity";

@Injectable()
export class DBService {
  private db: SQLiteObject;

  constructor(private engine: SQLite) {
    this.engine.create({ name: 'db', location: 'default' })
      .then((dbObj: SQLiteObject) => {
        this.db = dbObj;

        //date format(ISO):YYYY-MM-DD
        this.db.executeSql('CREATE TABLE IF NOT EXISTS snapshot (date TEXT PRIMARY KEY, amount INTEGER)', {});
        this.db.executeSql('CREATE TABLE IF NOT EXISTS item (date TEXT, no INTEGER,  platform:TEXT, risk:TEXT, term:TEXT, name:TEXT, amount:INTEGER, PRIMARY KEY(date, no))', {});
      });
  }

  insertSnapshot(entity: SnapshotEntity): Promise<any> {
    return this.db.executeSql('insert into snapshot (date, amount) values(?, ?)',
      [entity.date, entity.amount]);
  }

  insertItem(entity: AssetItemEntity): Promise<any> {
    return this.db.executeSql('insert into item (date, no, platform, risk, term, name, amount) values(?, ?, ?, ?, ?, ?, ?)',
      [entity.date, entity.no, entity.platform, entity.risk, entity.term, entity.name, entity.amount]);
  }

  updateSnapshot(entity: SnapshotEntity): Promise<any> {
    return this.db.executeSql('upate snapshot set amount = ? WHERE date = ?',
      [entity.amount, entity.date]);
  }

  updateItem(entity: AssetItemEntity): Promise<any> {
    return this.db.executeSql('upate item set platform = ?, risk = ?, term = ?, name = ?, amount = ? where date = ?, no = ?)',
      [entity.platform, entity.risk, entity.term, entity.name, entity.amount, entity.date, entity.no]);
  }

  selectLastSnapshot(): Promise<SnapshotEntity> {
    return this.db.executeSql('SELECT * FROM snapshot ORDER BY date DESC LIMIT 1', {})
      .then((res) => {
        if (res.rows.count > 0) {
          return {
            date: res.rows.item(0).date,
            amount: res.rows.item(0).amount
          };
        }
      });
  }

  selectPrevSnapshot(dateParam: Date): Promise<SnapshotEntity> {
    return this.db.executeSql('SELECT * FROM snapshot WHERE date < ? ORDER BY date DESC LIMIT 1', [dateParam])
      .then((res) => {
        if (res.rows.count > 0) {
          return {
            date: res.rows.item(0).date,
            amount: res.rows.item(0).amount
          };
        }
      });
  }

  selectNextSnapshot(dateParam: Date): Promise<SnapshotEntity> {
    return this.db.executeSql('SELECT * FROM snapshot WHERE date > ? ORDER BY date LIMIT 1', [dateParam])
      .then((res) => {
        if (res.rows.count > 0) {
          return {
            date: res.rows.item(0).date,
            amount: res.rows.item(0).amount
          };
        }
      });
  }

  selectSnapshotList(count: number, dateParam: string): Promise<SnapshotEntity[]> {
    if (!dateParam) {
      dateParam = '9999-99-99';
    }

    return this.db.executeSql('SELECT * FROM snapshot WHERE date < ? ORDER BY date DESC LIMIT ?', [dateParam, count])
      .then((res) => {
        if (res.rows.count > 0) {
          let entities: SnapshotEntity[] = [];
          for (let i = 0; i < res.rows.count; ++i) {
            entities.push({
              date: res.rows.item(i).date,
              amount: res.rows.item(i).amount
            });
          }
          return entities;
        }
      });
  }

  selectItems(dateParam: string): Promise<AssetItemEntity[]> {
    return this.db.executeSql('SELECT * FROM item WHERE date = ?', [dateParam]).then((res) => {
      if (res.rows.count > 0) {
        let items: AssetItemEntity[] = [];
        for (let i = 0; i < res.rows.count; ++i) {
          items.push({
            date: dateParam,
            no: res.rows.item(i).no,
            platform: res.rows.item(i).platform,
            risk: res.rows.item(i).risk,
            term: res.rows.item(i).term,
            name: res.rows.item(i).name,
            amount: res.rows.item(i).amount
          });
        }
        return items;
      }
    });
  }
}