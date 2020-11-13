import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu, NavController } from '@ionic/angular';
import { StorageKeys } from '../../Models/Enums/storage-keys.enum';
import { StorageService } from '../../Services/storage.service';
import { DataStoreService } from '../../Services/data-store.service';
import { SideMenuItem, SideMenuItems } from '../../Models/Classes/side-menu-item';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, DBUserDocument } from '../../Models/Classes/user';
import { UserRoles } from '../../Models/Enums/user-roles.enum';
import { DatabaseService } from '../../Services/database.service';
import { DataBaseCollections } from '../../Models/Enums/data-base-collections.enum';
import { Client } from '../../Models/Classes/client';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public selectedMenuItem: SideMenuItem;
  public sideMenuItems: SideMenuItems;
  private routerSubscription: Subscription;
  @ViewChild('menu') menu: IonMenu;
  constructor(
    private storage: StorageService,
    private nav: NavController,
    private router: Router,
    private dataBase: DatabaseService
  ) {
    const processItems = (user: User) => {
      this.selectedMenuItem = DataStoreService.SideMenu.GetSideMenuItems(user.data.role)[0];
      this.sideMenuItems = DataStoreService.SideMenu.GetSideMenuItems(user.data.role);
      this.routerSubscription = this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          const currentItemIndex = DataStoreService.SideMenu.GetSideMenuItems(user.data.role).findIndex(
            (x) => x.redirectTo === this.router.url.split('/')[1]
          );
          this.selectedMenuItem = DataStoreService.SideMenu.GetSideMenuItems(user.data.role)[currentItemIndex];
        }
      });
    };
    DataStoreService.User.CurrentUserObservable.subscribe((user) => {
      if (user !== null && user.data) {
        if (user.data.role === UserRoles.CLIENTE) {
          this.dataBase.getDocumentDataStream<DBUserDocument>(DataBaseCollections.users, user.UID).subscribe((user) => {
            DataStoreService.Client.CurrentClient = user.user as Client;
            processItems(user.user);
          });
        } else {
          processItems(user);
        }
      }
    });
  }

  ngOnInit() {}

  selectItem(item: SideMenuItem) {
    this.menu.close(true);
    this.selectedMenuItem = item;
  }

  async logOut() {
    this.routerSubscription.unsubscribe();
    this.menu.close(true);
    this.selectedMenuItem = DataStoreService.SideMenu.GetSideMenuItems(DataStoreService.User.CurrentUser.data?.role)[0];
    if (await this.storage.storageIsSet(StorageKeys.USER)) {
      await this.storage.deleteStorage(StorageKeys.USER);
    }
    if (this.storage.storageIsSet(StorageKeys.TOKEN)) {
      await this.storage.deleteStorage(StorageKeys.TOKEN);
    }

    if (this.storage.storageIsSet(StorageKeys.CLIENT)) {
      await this.storage.deleteStorage(StorageKeys.CLIENT);
    }

    if (this.storage.storageIsSet(StorageKeys.EMPLOYEE)) {
      await this.storage.deleteStorage(StorageKeys.EMPLOYEE);
    }
    this.nav.navigateRoot('', { animationDirection: 'back' });
  }
}
