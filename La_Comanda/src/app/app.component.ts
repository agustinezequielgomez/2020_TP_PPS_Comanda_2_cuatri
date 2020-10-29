import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { InitService } from './core/Services/init.service';
import { routingAnimation } from './core/animations/animations';
import { Plugins } from '@capacitor/core';
import { NotificationService } from './core/Services/notification.service';
import { StorageService } from './core/Services/storage.service';
import { StorageKeys } from './core/Models/Enums/storage-keys.enum';
import { Router } from '@angular/router';
import { DataStoreService } from './core/Services/data-store.service';
import { DatabaseService } from './core/Services/database.service';
import { DBUserDocument } from './core/Models/Classes/user';
import { DataBaseCollections } from './core/Models/Enums/data-base-collections.enum';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: []
})
export class AppComponent {

  public hideSplashAnimation = false;
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
    private notif: NotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (await this.storage.storageIsSet(StorageKeys.UID) && await this.storage.storageIsSet(StorageKeys.TOKEN)) {
        DataStoreService.User.CurrentUser = (await this.database.getDocumentData<DBUserDocument>(DataBaseCollections.users,
                                             await this.storage.getStorage(StorageKeys.UID))).user;
        // this.router.navigate(['']);
      }
      // this.router.navigate(['alta/cliente']);
      this.initService.init();
      this.statusBar.styleDefault();
      await SplashScreen.hide();
    });
  }
}