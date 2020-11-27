import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../../../core/Services/database.service';
import { Alimento } from '../../../core/Models/Classes/alimento';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { Order } from 'src/app/core/Models/Classes/order';
import { Photo } from 'src/app/core/Models/Classes/photo';
import { CameraService } from '../../../core/Services/camera.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientReview } from '../../../core/Models/Classes/client-review';
import { FirebaseStorageFolders } from 'src/app/core/Models/Enums/firebase-storage-folders.enum';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'gestion-client-review',
  templateUrl: './client-review.component.html',
  styleUrls: ['./client-review.component.scss'],
})
export class ClientReviewComponent implements OnInit {
  public reviewForm: FormGroup;
  public orderedFood: string[] = [];
  public photos: [Photo, Photo, Photo] = [null, null, null];
  public popoverOptions = { cssClass: 'selectClass' };
  constructor(
    private dataBase: DatabaseService,
    public camera: CameraService,
    public sanitizer: DomSanitizer,
    private creator: ComponentCreatorService,
    private notification: NotificationService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.reviewForm = new FormGroup({
      waiterKidness: new FormControl(null, Validators.required),
      platePresentation: new FormControl('', Validators.required),
      orderedFood: new FormControl([], Validators.required),
      comments: new FormControl('', Validators.required),
      overallSatisfaction: new FormControl(0, Validators.required),
    });
    this.orderedFood.push(
      ...(
        await this.dataBase.getDocumentData<{ order: Order }>(
          DataBaseCollections.orders,
          DataStoreService.Client.CurrentClient.orderId
        )
      ).order.items
        .map((item) => item.nombre)
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    DataStoreService.Various.CapturedPhotosObservable.subscribe((photos) => {
      for (let i = 0; i < photos.length; i++) {
        this.photos[i] = photos[i];
      }
    });
  }

  public setOrderedFood(food: string) {
    const formControlValue: string[] = this.reviewForm.controls.orderedFood.value;
    if (!formControlValue.includes(food)) {
      this.reviewForm.controls.orderedFood.setValue([...formControlValue, food]);
    } else {
      formControlValue.splice(formControlValue.indexOf(food), 1);
      this.reviewForm.controls.orderedFood.setValue(formControlValue);
    }
  }

  public async sendReview() {
    const loader = await this.creator.createLoader(
      'md',
      'Enviando encuesta...',
      true,
      true,
      'crescent',
      false,
      'ion-loader'
    );
    await loader.present();
    try {
      const photos = await this.camera.uploadPicture(FirebaseStorageFolders.clientReview);
      const review: ClientReview = {
        waiterKidness: this.reviewForm.controls.waiterKidness.value,
        platePresentation: this.reviewForm.controls.platePresentation.value,
        orderedFood: this.reviewForm.controls.orderedFood.value,
        comments: this.reviewForm.controls.comments.value,
        overallSatisfaction: this.reviewForm.controls.overallSatisfaction.value,
        photos,
      };
      await this.dataBase.saveDocument(
        DataBaseCollections.clientReview,
        DataStoreService.Client.CurrentClient.orderId,
        review
      );
      await loader.dismiss();
      await this.notification.presentToast(
        'success',
        'Encuesta enviada. ¡Muchas gracias por su feedback!',
        0,
        'md',
        'bottom'
      );
      this.reviewForm.reset();
      await this.nav.navigateBack('home');
    } catch (ex) {
      await loader.dismiss();
    }
  }
}
