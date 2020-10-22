import { Injectable } from '@angular/core';
import { CameraDirection, CameraOptions, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Photo } from '../Models/Classes/photo';
import { User } from '../Models/Classes/user';
import { DataStoreService } from './data-store.service';
import { FirebaseStorageFolders } from '../Models/Enums/firebase-storage-folders.enum';
import { DatabaseService } from './database.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ClientDBDocument, Client } from '../Models/Classes/client';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private static readonly CAMERA_OPTIONS: CameraOptions = {
    allowEditing: false,
    correctOrientation: true,
    direction: CameraDirection.Front,
    quality: 20,
    resultType: CameraResultType.Base64,
    saveToGallery: false,
    source: CameraSource.Camera
  };
  constructor(private dataBase: DatabaseService, private fireStore: AngularFireStorage) { }

  async takePicture(multiplePhotos: boolean) {
    await Camera.requestPermissions();
    const photoTaken = await Camera.getPhoto(CameraService.CAMERA_OPTIONS);
    const photoObject: Photo = {
      photoUrl: `data:image/${photoTaken.format};base64, ${photoTaken.base64String}`,
      fileName: `${DataStoreService.User.CurrentUser.email}_${new Date().toISOString()}`,
      takenBy: `${DataStoreService.User.CurrentUser.email}`,
      takenAt: new Date(),
    };
    (multiplePhotos) ? DataStoreService.Various.AddCapturedPhoto =  photoObject : DataStoreService.Various.CapturedPhotos = [photoObject];
  }

  async uploadPicture(folder: FirebaseStorageFolders) {
    try {
      for (const photo of DataStoreService.Various.CapturedPhotos) {
        const fileName = `${folder}/${photo.fileName}`;
        const ref = this.fireStore.ref(fileName);
        await ref.putString(photo.photoUrl, 'data_url', {contentType: 'image/jpeg'});
        photo.photoUrl = await ref.getDownloadURL().toPromise();
      }

      switch (folder) {
        case FirebaseStorageFolders.client:
          for (const photo of DataStoreService.Various.CapturedPhotos) {
            const client: Client = DataStoreService.Client.RegisteredClient;
            client.photoUrl = photo.photoUrl;
            await this.dataBase.saveDocument<ClientDBDocument>(DataBaseCollections.clients,
                                                          DataStoreService.Client.RegisteredClient.UID, { client });
          }
          break;

      }
    }catch (ex) {
      console.log(ex);
      // console.log(`upload error ${{...ex}}`);
    }
  }
}
