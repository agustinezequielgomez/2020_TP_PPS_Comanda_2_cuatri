import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CryptoService } from './crypto.service';
import { StorageKeys } from '../Models/Enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private crypto: CryptoService) { }

  async setStorage(key: StorageKeys, data: any): Promise<void> {
    await this.storage.set(key, this.crypto.encryptObject(data));
  }

  async getStorage<T>(key: StorageKeys): Promise<T | null> {
    if (!this.storageIsSet(key)) {
      return null;
    }
    return (this.crypto.decryptObect(await this.storage.get(key)) as T);
  }

  async deleteStorage(key: StorageKeys): Promise<void> {
    await this.storage.remove(key);
  }

  async storageIsSet(key: StorageKeys): Promise<boolean> {
    return (await this.storage.keys()).includes(key);
  }

  async clearStorage(): Promise<void> {
    await this.storage.clear();
  }
}
