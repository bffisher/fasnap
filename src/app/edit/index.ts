import { Component, ViewChild } from '@angular/core';
import {EditSnapshotPage} from './snapshot'

@Component({
  templateUrl: 'index.html'
})
export class EditIndexPage {
  // First page to push onto the stack
  rootPage = EditSnapshotPage;

  constructor(){
  }
}