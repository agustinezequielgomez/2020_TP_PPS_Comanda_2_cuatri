import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CameraDirection, CameraOptions, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Photo } from '../Models/Classes/photo';
import { FirebaseStorageFolders } from '../Models/Enums/firebase-storage-folders.enum';
import { DataStoreService } from './data-store.service';
import { DatabaseService } from './database.service';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private static readonly CAMERA_OPTIONS: CameraOptions = {
    allowEditing: false,
    correctOrientation: true,
    direction: CameraDirection.Front,
    quality: 20,
    resultType: CameraResultType.Base64,
    saveToGallery: false,
    source: CameraSource.Camera,
  };
  constructor(private fireStore: AngularFireStorage, private scanner: BarcodeScanner) {}

  async takePicture(multiplePhotos: boolean) {
    try {
      await Camera.requestPermissions();
      const photoTaken = await Camera.getPhoto(CameraService.CAMERA_OPTIONS);
      const photoObject: Photo = {
        photoUrl: `data:image/${photoTaken.format};base64, ${photoTaken.base64String}`,
        fileName: DataStoreService.User.CurrentUser
          ? `${DataStoreService.User.CurrentUser.email}_${new Date().toISOString()}`
          : `anonymous_${new Date().toISOString()}`,
        takenBy: DataStoreService.User.CurrentUser ? `${DataStoreService.User.CurrentUser.email}` : 'anonymous',
        takenAt: new Date(),
      };
      console.log(`photo captured: ${JSON.stringify(photoObject)}`);
      multiplePhotos
        ? (DataStoreService.Various.AddCapturedPhoto = photoObject)
        : (DataStoreService.Various.CapturedPhotos = [photoObject]);
    } catch (err) {
      console.log(`photo captured err: ${err}`);
    }
  }

  async uploadPicture(folder: FirebaseStorageFolders) {
    try {
      for (const photo of DataStoreService.Various.CapturedPhotos) {
        const fileName = `${folder}/${photo.fileName}`;
        const ref = this.fireStore.ref(fileName);
        await ref.putString(photo.photoUrl, 'data_url', { contentType: 'image/jpeg' });
        photo.photoUrl = await ref.getDownloadURL().toPromise();
      }
      const photoUrls = DataStoreService.Various.CapturedPhotos.map((x) => x.photoUrl);
      DataStoreService.Various.CapturedPhotos = [];
      return photoUrls;
    } catch (ex) {
      console.log(ex);
      // console.log(`upload error ${{...ex}}`);
    }
  }

  async scanBarCode() {
    try {
      const data = (
        await this.scanner.scan({
          formats: 'PDF_417',
          showFlipCameraButton: true,
          prompt: 'Por favor, situa el código del DNI en el centro de la pantalla.',
          resultDisplayDuration: 0,
        })
      ).text.split('@');
      if (data.length === 17) {
        DataStoreService.User.ScannedUser = { DNI: parseInt(data[1], 10), name: data[5], lastName: data[4] };
      } else {
        DataStoreService.User.ScannedUser = { DNI: parseInt(data[4], 10), name: data[2], lastName: data[1] };
      }
    } catch (err) {
      console.log(`scan error ${err}`);
    }
  }

  async scanQrCode() {
    try {
      return (
        await this.scanner.scan({
          formats: 'QR_CODE',
          showFlipCameraButton: true,
          prompt: 'Por favor, situa el código QR en el centro de la pantalla.',
          resultDisplayDuration: 0,
        })
      ).text;
    } catch (err) {
      console.log(`scan error ${err}`);
      throw err;
    }
  }
}
