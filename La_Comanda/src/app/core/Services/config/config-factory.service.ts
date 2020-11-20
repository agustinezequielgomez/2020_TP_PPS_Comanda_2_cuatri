import { Injectable, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IConfigService } from '../Interfaces/iconfig-service';
import { AndroidConfigService } from './android-config.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigFactoryService {
  constructor(private platform: Platform, private injector: Injector) {}

  create(): IConfigService {
    if (true) {
      return this.injector.get(AndroidConfigService);
    }

    return null;
  }
}
