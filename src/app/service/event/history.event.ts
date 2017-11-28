import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { SnapshotEntity } from '../entity/snapshot.entity';
 
@Injectable()
export class HistoryEvent {
  // Observable SnapshotEntity sources
  private itemClickedSource = new Subject<SnapshotEntity>();
 
  // Observable SnapshotEntity streams
  itemClickedSource$ = this.itemClickedSource.asObservable();
 
  // Service message commands
  itemClicked(item: SnapshotEntity) {
    this.itemClickedSource.next(item);
  }
}