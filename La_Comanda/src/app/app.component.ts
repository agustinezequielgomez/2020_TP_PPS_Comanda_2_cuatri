import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { InitService } from './core/Services/init.service';
import { routingAnimation } from './core/animations/animations';
import { Plugins } from '@capacitor/core';
import { NotificationService } from './core/Services/notification.service';
import { StorageService } from './core/Services/storage.service';
import { StorageKeys } from './core/Models/Enums/storage-keys.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStoreService } from './core/Services/data-store.service';
import { DatabaseService } from './core/Services/database.service';
import { DBUserDocument, User } from './core/Models/Classes/user';
import { DataBaseCollections } from './core/Models/Enums/data-base-collections.enum';
import { environment } from 'src/environments/environment';
import { UserRoles } from './core/Models/Enums/user-roles.enum';
import { Client } from './core/Models/Classes/client';
import { Employee } from './core/Models/Classes/employee';
import { Location } from '@angular/common';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit {

  public hideSplashAnimation = false;
  public routerMargin: boolean;
  public get RoutingAnimation() {
    return routingAnimation;
  }

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private initService: InitService,
    private storage: StorageService,
    private database: DatabaseService,
    private router: Router,
    private location: Location
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    // COMENTAR CUANDO NO SE ESTE EN MODO LIVE-RELOAD
    DataStoreService.SideMenu.DisplayMenuHeader = this.routerMargin = !(this.location.path() === '');
    if (!environment.production && await this.storage.storageIsSet(StorageKeys.USER)) {
      const user = DataStoreService.User.CurrentUser = await this.storage.getStorage<User>(StorageKeys.USER);
      if (user.data.role === UserRoles.CLIENTE) {
        DataStoreService.Client.CurrentClient = await this.storage.getStorage<Client>(StorageKeys.CLIENT);
      } else {
        DataStoreService.Employee.CurrentEmployee = await this.storage.getStorage<Employee>(StorageKeys.EMPLOYEE);
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (await this.storage.storageIsSet(StorageKeys.UID) && await this.storage.storageIsSet(StorageKeys.TOKEN)) {
        DataStoreService.User.CurrentUser = (await this.database.getDocumentData<DBUserDocument>(DataBaseCollections.users,
                                             await this.storage.getStorage(StorageKeys.UID))).user;

        // this.router.navigate(['home']);
      }

      this.router.events.subscribe(event => {
        DataStoreService.SideMenu.DisplayMenuHeader = this.routerMargin = !(this.location.path() === '');
      });

      this.initService.init();
      this.statusBar.styleDefault();
      await SplashScreen.hide();
    });
  }
}
