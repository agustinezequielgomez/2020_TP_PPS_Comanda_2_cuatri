import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { AuthService } from '../../../core/Services/auth.service';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { NotificationService } from '../../../core/Services/notification.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/Services/database.service';
import { CameraService } from 'src/app/core/Services/camera.service';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Alimento, TipoAlimento } from 'src/app/core/Models/Classes/alimento';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { FirebaseStorageFolders } from 'src/app/core/Models/Enums/firebase-storage-folders.enum';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.scss'],
})
export class BebidaComponent implements OnInit {
  public form: FormGroup;
  public enabled = false;
  public qr = '';
  fotos = [];
  hasWriteAccess = false;
  @Input() isAccess: boolean;
  @Output() toLogin = new EventEmitter<void>();
  constructor(
    private pipe: TitleCasePipe,
    private auth: AuthService,
    private notification: NotificationService,
    private creator: ComponentCreatorService,
    private router: Router,
    private db: DatabaseService,
    private cameraService: CameraService,
    private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions
  ) {}

  ngOnInit() {
    this.checkPermissions();
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      precio: new FormControl(1, [Validators.required, Validators.min(1)]),
      qr: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    });
    this.form.valueChanges.subscribe(
      () => (this.enabled = DataStoreService.Various.CapturedPhotos.length > 0 && this.form.valid)
    );
    DataStoreService.Various.CapturedPhotosObservable.subscribe(
      (photos) => (this.enabled = photos.length > 0 && this.form.valid)
    );
  }

  actualizarQR(event) {
    console.log(event.target.value);
    this.qr = event.target.value;
  }

  checkPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      (result) => {
        console.log('Has permission?', result.hasPermission);
        this.hasWriteAccess = result.hasPermission;
      },
      (err) => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      }
    );
    if (!this.hasWriteAccess) {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    }
  }

  private makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async tomarFotos() {
    await this.cameraService.takePicture(true);
    this.fotos = DataStoreService.Various.CapturedPhotos;
  }

  async altaBebida() {
    if (!this.hasWriteAccess) {
      this.checkPermissions();
    }
    if (this.fotos.length < 3) {
      await this.notification.presentToast('danger', '¡Debe subir 3 fotos de la bebida', 3000, 'md', 'bottom');
      return;
    }
    const loader = await this.creator.createLoader('md', 'Creando bebida', true, true, 'crescent', false, 'ion-loader');
    loader.present();
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    const data = imageData.split(',')[1];
    this.base64ToGallery
      .base64ToGallery(data, { prefix: `bebida${this.form.get('name').value}_`, mediaScanner: true })
      .then(
        async (res) => {
          console.log('foto guardada');
          const photoUrl = await this.cameraService.uploadPicture(FirebaseStorageFolders.bebidas);
          const bebida: Alimento = {
            descripcion: this.form.get('descripcion').value,
            nombre: this.form.get('name').value,
            precio: parseInt(this.form.get('precio').value, 10),
            tipo: TipoAlimento.BEBIDA,
            qr: this.form.get('qr').value,
            fotos: photoUrl,
          };
          const UID = this.makeid(20);
          this.db.saveDocument(DataBaseCollections.bebidas, UID, bebida).then(async () => {
            this.form.reset();
            await this.notification.presentToast(
              'success',
              '¡Bebida creada con éxito! Esta bebida esta lista para ser pedido por nuestros comensales. El codigo QR lo encontrara en la galeria de imagenes',
              4000,
              'md',
              'bottom'
            );
            DataStoreService.Various.CapturedPhotos = [];
            await loader.dismiss();
            this.form.reset({ descripcion: 0, nombre: 0, qr: '', precio: 1 });
            this.router.navigateByUrl('home');
          });
        },
        (err) => console.log('err', err)
      );
  }
}
