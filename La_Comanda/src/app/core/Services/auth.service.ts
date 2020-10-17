import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageKeys } from '../Models/Enums/storage-keys.enum';
import { StorageService } from './storage.service';
import { DataStoreService } from './data-store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private storage: StorageService) { }

  async signInWithEmail(email: string, password: string): Promise<firebase.User> {
    try {
      const USER: firebase.User = (await this.auth.signInWithEmailAndPassword(email, password)).user;
      console.log(USER.uid);
      this.storage.setStorage(StorageKeys.UID, USER.uid);
      this.storage.setStorage(StorageKeys.EMAIL, USER.email);
      this.storage.setStorage(StorageKeys.USER, USER);
      DataStoreService.User.CurrentUser = {
        UID: USER.uid,
        email,
        password,
        token: await USER.getIdToken(),
        refreshToken: USER.refreshToken
      };
      return USER;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signOut() {
    await this.auth.signOut();
  }
}
