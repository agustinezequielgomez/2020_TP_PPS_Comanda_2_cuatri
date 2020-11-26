import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { pluck, map } from 'rxjs/operators';
import { Client, ClientState } from '../Models/Classes/client';
import { DBUserDocument } from '../Models/Classes/user';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';
import { FirebaseStorageFolders } from '../Models/Enums/firebase-storage-folders.enum';
import { StorageKeys } from '../Models/Enums/storage-keys.enum';
import { UserRoles } from '../Models/Enums/user-roles.enum';
import { CameraService } from './camera.service';
import { DataStoreService } from './data-store.service';
import { DatabaseService } from './database.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';
import { DocumentData, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Employee } from '../Models/Classes/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private storage: StorageService,
    private dataBase: DatabaseService,
    private camera: CameraService,
    private notification: NotificationService
  ) {}

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
        // token: await USER.getIdToken(),
        // refreshToken: USER.refreshToken,
        photoUrl: '',
      };
      return USER;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signUp(userData: {
    email: string;
    password: string;
    DNI: number;
    role: UserRoles;
    name: string;
    lastName: string;
    CUIL?: string;
  }): Promise<boolean> {
    try {
      const existingDni = await this.dataBase.queryCollection<DBUserDocument>(DataBaseCollections.users, (x) =>
        x.where('user.data.DNI', '==', userData.DNI)
      );
      if (existingDni.length > 0) {
        await this.notification.presentToast(
          'danger',
          'Lo sentimos, pero ya hay un usuario registrado con ese DNI.',
          0,
          'md',
          'bottom'
        );
        return false;
      }
      const { email, password, role, DNI, name, lastName } = userData;
      const UID = (await this.auth.createUserWithEmailAndPassword(email, password)).user.uid;
      switch (role) {
        case UserRoles.CLIENTE:
          {
            DataStoreService.Various.CapturedPhotos[0].takenBy = email;
            DataStoreService.Various.CapturedPhotos[0].fileName = `${email}_${
              DataStoreService.Various.CapturedPhotos[0].fileName.split('_')[1]
            }`;
            const photoUrl = (await this.camera.uploadPicture(FirebaseStorageFolders.client))[0];
            const client: Client = {
              email,
              password,
              photoUrl,
              UID,
              enabled: null,
              isAnonymous: false,
              data: { role, DNI, name, lastName, deviceToken: DataStoreService.Notification.NotificationToken },
              state: ClientState.NULO,
            };
            this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, UID, { user: client });
            this.sendRegistrationPushNotification();
          }
          break;
        case UserRoles.BARTENDER:
        case UserRoles.COCINERO:
        case UserRoles.DUEÑO:
        case UserRoles.METRE:
        case UserRoles.MOZO:
        case UserRoles.SUPERVISOR:
          {
            DataStoreService.Various.CapturedPhotos[0].takenBy = email;
            DataStoreService.Various.CapturedPhotos[0].fileName = `${email}_${
              DataStoreService.Various.CapturedPhotos[0].fileName.split('_')[1]
            }`;
            const photoUrl = (await this.camera.uploadPicture(FirebaseStorageFolders.client))[0];
            const employee: Employee = {
              email,
              password,
              photoUrl,
              UID,
              CUIL: userData.CUIL,
              enabled: true,
              data: { role, DNI, name, lastName, deviceToken: null },
            };
            this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, UID, { user: employee });
          }
          break;
      }
      return true;
    } catch (ex) {
      console.log(ex);
      const err: { a: any; code: string; message: string; stack: string } = ex;
      let errorMessage: string;
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Lo sentimos, pero ya hay una cuenta asociada al correo electrónico ingresado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Lo sentimos, pero el correo electrónico ingresado no es válido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Lo sentimos, pero la contraseña no es lo suficientemente fuerte';
          break;
      }
      await this.notification.presentToast('danger', errorMessage, 0, 'md', 'bottom');
      return false;
    }
  }

  async sendRegistrationPushNotification() {
    const deviceTokens: string[] = await this.dataBase
      .getCollection<DBUserDocument>(DataBaseCollections.users, (x) =>
        x.where('user.data.role', 'in', ['supervisor', 'dueño'])
      )
      .get()
      .pipe(
        pluck<QuerySnapshot<DocumentData>, QueryDocumentSnapshot<DocumentData>[]>('docs'),
        map((documents) => documents.map((doc) => (doc.data() as DBUserDocument).user.data.deviceToken))
      )
      .toPromise();
    await this.notification.sendPushNotification({
      registration_ids: deviceTokens,
      notification: { title: 'Nuevo cliente registrado', body: 'Es necesario que valides el perfil' },
      data: { redirectTo: 'userAdmin' },
    });
  }

  async signOut() {
    await this.auth.signOut();
  }
}
