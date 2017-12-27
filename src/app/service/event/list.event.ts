import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { SnapshotEntity } from '../entity/snapshot.entity';
 
@Injectable()
export class ListEvent {
  // Observable SnapshotEntity sources
  private itemClickedSource = new Subject<SnapshotEntity>();
  private itemAddedSource = new Subject<SnapshotEntity>();
  private itemModifiedSource = new Subject<SnapshotEntity>();
  private itemDeletedSource = new Subject<SnapshotEntity>();
 
  // Observable SnapshotEntity streams
  itemClickedSource$ = this.itemClickedSource.asObservable();
  itemAddedSource$ = this.itemAddedSource.asObservable();
  itemModifiedSource$ = this.itemModifiedSource.asObservable();
  itemDeletedSource$ = this.itemDeletedSource.asObservable();
 
  // Service message commands
  itemAdded(item: SnapshotEntity) {
    this.itemAddedSource.next(item);
  }

  itemClicked(item: SnapshotEntity) {
    this.itemClickedSource.next(item);
  }

  itemModified(item: SnapshotEntity) {
    this.itemModifiedSource.next(item);
  }

  itemDeleted(item: SnapshotEntity) {
    this.itemDeletedSource.next(item);
  }
}