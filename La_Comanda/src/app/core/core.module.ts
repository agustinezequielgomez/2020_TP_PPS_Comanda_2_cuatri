import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QRScannerComponent } from './Components/qrscanner/qrscanner.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { ListItemPhotoComponent } from './Components/list-item-photo/list-item-photo.component';
import { ListItemSkeletonComponent } from './Components/list-item-skeleton/list-item-skeleton.component';
import { PhotoPreviewComponent } from './Components/photo-preview/photo-preview.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    QRScannerComponent,
    BarChartComponent,
    ListItemPhotoComponent,
    ListItemSkeletonComponent,
    PhotoPreviewComponent,
    QRScannerComponent
  ],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    AppVersion,
    NavigationBar,
    AndroidPermissions,
    QRScanner,
  ],
})
export class CoreModule { }
