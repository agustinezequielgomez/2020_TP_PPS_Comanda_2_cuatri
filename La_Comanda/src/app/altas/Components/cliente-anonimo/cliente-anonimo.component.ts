import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { CameraService } from '../../../core/Services/camera.service';
import { FirebaseStorageFolders } from 'src/app/core/Models/Enums/firebase-storage-folders.enum';
import { Guid } from 'guid-typescript';
import { Client, ClientState } from 'src/app/core/Models/Classes/client';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { NavController } from '@ionic/angular';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { NotificationService } from '../../../core/Services/notification.service';

@Component({
  selector: 'alta-cliente-anonimo',
  templateUrl: './cliente-anonimo.component.html',
  styleUrls: ['./cliente-anonimo.component.scss'],
})
export class ClienteAnonimoComponent implements OnInit {
  public enabled: boolean;
  public name: string;
  @Output() toLogin = new EventEmitter<void>();
  constructor(
    private camera: CameraService,
    private dataBase: DatabaseService,
    private nav: NavController,
    private creator: ComponentCreatorService,
    private notif: NotificationService
  ) {}

  ngOnInit() {
    DataStoreService.Various.CapturedPhotosObservable.subscribe(
      (photos) => (this.enabled = photos.length > 0 && this.name.length > 0)
    );
  }

  onChange(name: string) {
    this.name = name;
    this.enabled = DataStoreService.Various.CapturedPhotos.length > 0 && name.length > 0;
  }

  async logIn() {
    const loader = await this.creator.createLoader(
      'md',
      'Ingresando anónimamente',
      true,
      true,
      'crescent',
      false,
      'ion-loader'
    );
    try {
      await loader.present();
      const photoUrl = (await this.camera.uploadPicture(FirebaseStorageFolders.client))[0];
      const client: Client = {
        UID: Guid.raw(),
        email: null,
        password: null,
        photoUrl,
        isAnonymous: true,
        enabled: true,
        data: {
          name: this.name,
          lastName: null,
          role: UserRoles.CLIENTE,
          DNI: null,
          deviceToken: null,
        },
        state: ClientState.NULO,
      };
      await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
      DataStoreService.User.CurrentUser = DataStoreService.Client.CurrentClient = client;
      this.name = '';
      this.nav.navigateForward('home');
    } catch (err) {
      console.log(`anonimous error ${err}`);
      await this.notif.presentToast('danger', 'Error al ingresar anonimamente', 10000, 'md', 'bottom');
    }
    await loader.dismiss();
  }
}
