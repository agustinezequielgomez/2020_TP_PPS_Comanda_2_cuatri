import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppConfig } from '../Models/Classes/app-config';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';
import { StorageKeys } from '../Models/Enums/storage-keys.enum';
import { ConfigFactoryService } from './config/config-factory.service';
import { DatabaseService } from './database.service';
import { StorageService } from './storage.service';
const packageJson = require('../../../../package.json');

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private storage: StorageService, private dataBase: DatabaseService, private app: AppVersion,
              private factory: ConfigFactoryService) { }

  async init() {
    try {
      await this.getAppConfiguration();
      await this.factory.create().loadAppConfiguration();
    } catch (error) {
      console.log(error);
    }
  }

  async getAppConfiguration(): Promise<AppConfig> {
    try {
      if (await this.storage.storageIsSet(StorageKeys.CONFIG)) {
        return await this.storage.getStorage<AppConfig>(StorageKeys.CONFIG);
      } else {
        const CONFIG = await this.dataBase.getDocumentData<AppConfig>(DataBaseCollections.config, packageJson.name);
        await this.storage.setStorage(StorageKeys.CONFIG, CONFIG);
        return CONFIG;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
