import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../Services/data-store.service';

@Component({
  selector: 'core-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  public displayHeader = false;
  constructor() {}

  ngOnInit() {
    DataStoreService.SideMenu.DisplayMenuObservable.subscribe((display) => (this.displayHeader = display));
  }
}
