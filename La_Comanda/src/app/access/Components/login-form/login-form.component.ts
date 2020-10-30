import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/Models/Classes/client';
import { TestUser } from 'src/app/core/Models/Classes/test-user';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { DBUserDocument, User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from '../../../core/Models/Enums/storage-keys.enum';
import { AuthService } from '../../../core/Services/auth.service';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { StorageService } from '../../../core/Services/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  public rememberUser = false;
  @Output() toSignUp = new EventEmitter<void>();
  @Output() toSignAnonymousLogIn = new EventEmitter<void>();
  public set SetUser(user: User) {
    this.loginForm.setValue({
      userName: user.email,
      password: user.password
    });
  }

  constructor(private auth: AuthService, private dataBase: DatabaseService, private router: Router,
              private notification: NotificationService, private storage: StorageService) { }

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

  toggleRememberUser(): void {
    this.rememberUser = !this.rememberUser;
  }

  public async login() {
    try {
      const USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value,
                         this.loginForm.controls['password'].value.toString());

      const userData = DataStoreService.User.CurrentUser = (await this.dataBase.getDocumentData<DBUserDocument>
                                                            (DataBaseCollections.users, USER.uid)).user;
      if (this.rememberUser) {
        await this.storage.setStorage(StorageKeys.TOKEN, USER.refreshToken);
        await this.storage.setStorage(StorageKeys.UID, USER.uid);
      }
      await this.notification.pushNotificationsInit();
      switch (userData.data.role) {
        case UserRoles.CLIENTE:
          DataStoreService.Client.RegisteredClient = userData as Client;
          break;
        }
      this.router.navigate(['home']);
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
      this.notification.presentToast('danger', errorMessage, 8000, 'ios', 'bottom', 'Error al hacer login');
    }
  }
}
