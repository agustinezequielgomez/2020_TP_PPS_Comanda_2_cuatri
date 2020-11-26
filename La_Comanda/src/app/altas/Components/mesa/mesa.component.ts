import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { AuthService } from '../../../core/Services/auth.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { FirebaseStorageFolders } from '../../../core/Models/Enums/firebase-storage-folders.enum';
import { CameraService } from 'src/app/core/Services/camera.service';
import { DBMesaDocument, Mesa } from 'src/app/core/Models/Classes/mesa';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent implements OnInit {
  public form: FormGroup;
  public enabled = false;
  public qr = '';
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
    private barcodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions
  ) {}

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

  ngOnInit() {
    this.checkPermissions();
    this.form = new FormGroup({
      cantidad_comensales: new FormControl('', [Validators.required, Validators.min(1)]),
      numero: new FormControl('', [Validators.required, Validators.min(1)]),
      qr: new FormControl('', [Validators.required]),
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

  async altaMesa() {
    if (!this.hasWriteAccess) {
      this.checkPermissions();
    }
    const loader = await this.creator.createLoader('md', 'Creando mesa', true, true, 'crescent', false, 'ion-loader');
    loader.present();
    const existingTable = await this.db.queryCollection<DBMesaDocument>(DataBaseCollections.mesas, (x) =>
      x.where('numero', '==', parseInt(this.form.get('numero').value, 10))
    );
    console.log('existe mesa', existingTable);
    if (existingTable.length > 0) {
      await this.notification.presentToast(
        'danger',
        'Lo sentimos, pero ya hay una mesa registrada con ese numero.',
        2000,
        'md',
        'bottom'
      );
      await loader.dismiss();
      return false;
    }
    await loader.dismiss();
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    const data = imageData.split(',')[1];
    this.base64ToGallery
      .base64ToGallery(data, { prefix: `mesaNro_${this.form.get('numero').value}_`, mediaScanner: true })
      .then(
        async (res) => {
          console.log('foto guardada');
          const photoUrl = (await this.cameraService.uploadPicture(FirebaseStorageFolders.mesas))[0];
          const mesa: Mesa = {
            cantidad_comensales: parseInt(this.form.get('cantidad_comensales').value, 10),
            numero: parseInt(this.form.get('numero').value, 10),
            qr: this.form.get('qr').value,
            foto: photoUrl,
            cliente: null,
          };
          const UID = this.makeid(20);
          this.db.saveDocument(DataBaseCollections.mesas, UID, mesa).then(async () => {
            this.form.reset();
            await this.notification.presentToast(
              'success',
              '¡Mesa creada con éxito! La mesa esta lista para ser preparada. El codigo QR lo encontrara en la galeria de imagenes',
              4000,
              'md',
              'bottom'
            );
            DataStoreService.Various.CapturedPhotos = [];
            await loader.dismiss();
            this.form.reset({ cantidad_comensales: 0, numero: 0, qr: '' });
            this.router.navigateByUrl('home');
          });
        },
        (err) => console.log('err', err)
      );
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
}
