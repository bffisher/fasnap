import { Component } from '@angular/core';
import {ListPage} from './list'

@Component({
  templateUrl: 'navigation.html'
})
export class NavigationPage {
  // First page to push onto the stack
  rootPage = ListPage;

  constructor(){
  }
}