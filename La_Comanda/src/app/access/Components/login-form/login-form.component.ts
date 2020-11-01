import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { Client } from 'src/app/core/Models/Classes/client';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { environment } from 'src/environments/environment';
import { Employee } from '../../../core/Models/Classes/employee';
import { DBUserDocument, User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from '../../../core/Models/Enums/storage-keys.enum';
import { AuthService } from '../../../core/Services/auth.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { StorageService } from '../../../core/Services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public rememberUser = false;
  @Output() toSignUp = new EventEmitter<void>();
  @Output() toSignAnonymousLogIn = new EventEmitter<void>();
  public set SetUser(user: User) {
    this.loginForm.setValue({
      userName: user.email.trim(),
      password: user.password.trim()
    });
  }

  constructor(private auth: AuthService, private dataBase: DatabaseService, private nav: Router,
              private notification: NotificationService, private storage: StorageService, private creator: ComponentCreatorService) { }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    try {
      if (await this.storage.storageIsSet(StorageKeys.UID)) {
        await this.storage.deleteStorage(StorageKeys.UID);
      }
      if (await this.storage.storageIsSet(StorageKeys.TOKEN)) {
        await this.storage.deleteStorage(StorageKeys.TOKEN);
      }

      DataStoreService.Access.QuickUserSelectedObservable.subscribe((user) => {
        if (user !== null) {
          this.SetUser = user;
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.loginForm.reset( { userName: '', password: '' });
    DataStoreService.Access.QuickUser = null;
  }

  toggleRememberUser(): void {
    this.rememberUser = !this.rememberUser;
  }

  public async login() {
    const loader = await this.creator.createLoader('md', 'Iniciando sesión', true, true, 'crescent', false, 'ion-loader');
    try {
      await loader.present();
      const USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value,
                         this.loginForm.controls['password'].value.toString());

      const userData = DataStoreService.User.CurrentUser = (await this.dataBase.getDocumentData<DBUserDocument>
                                                            (DataBaseCollections.users, USER.uid)).user;
      if (userData.data.role === UserRoles.CLIENTE && (userData as Client).enabled === null) {
        await this.notification.presentToast('danger', 'Lo sentimos, pero tu usuario aún no fue aprobado por nuestros supervisores.', 8000, 'md', 'bottom', 'Error al hacer login');
        await loader.dismiss();
        return null;
      }

      if (userData.data.role === UserRoles.CLIENTE && (userData as Client).enabled === false) {
        await this.notification.presentToast('danger', 'Lo sentimos, pero tu usuario fué rechazado. Agradecemos el interés en utilizar nuestros servicios', 8000, 'md', 'bottom', 'Error al hacer login');
        await loader.dismiss();
        return null;
      }

      if (this.rememberUser) {
        await this.storage.setStorage(StorageKeys.TOKEN, USER.refreshToken);
        await this.storage.setStorage(StorageKeys.UID, USER.uid);
      }
      // await this.notification.pushNotificationsInit();
      switch (userData.data.role) {
        case UserRoles.CLIENTE:
          DataStoreService.Client.CurrentClient = userData as Client;
          break;

          default:
            DataStoreService.Employee.CurrentEmployee = userData as Employee;
      }

      // Si es ambiente de desarrollo seteo los datos del usuario en un storage mas permanente
      // para tenerlo disponbile cada vez que hacemos refresh de la app
      if (!environment.production) {
        await this.storage.setStorage(StorageKeys.USER, userData);
        if (userData.data.role === UserRoles.CLIENTE) {
          await this.storage.setStorage(StorageKeys.CLIENT, userData as Client);
        } else {
          await this.storage.setStorage(StorageKeys.EMPLOYEE, userData as Employee);
        }
      }
      this.nav.navigate(['home']);
    } catch (ex) {
      console.log(ex);
      const ERROR: {a: any, code: string, message: string, stack: string} = ex;
      let errorMessage = '';
      switch (ERROR.code) {
        case 'auth/invalid-email':
          errorMessage = 'Mail incorrecto. Por favor, inténtelo nuevamente';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado, lo sentimos.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado. Por favor, inténtelo nuevamente';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta. Por favor, inténtelo nuevamente';
          break;
      }
      this.notification.presentToast('danger', errorMessage, 8000, 'md', 'bottom', 'Error al hacer login');
    }
    await loader.dismiss();
  }
}
