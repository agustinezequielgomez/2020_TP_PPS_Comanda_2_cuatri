import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { AvatarUploaderComponent } from './Components/avatar-uploader/avatar-uploader.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { DNIFormInputComponent } from './Components/dniform-input/dniform-input.component';
import { HomeScreenCardComponent } from './Components/home-screen-card/home-screen-card.component';
import { HomeScreenComponent } from './Components/home-screen/home-screen.component';
import { ListItemPhotoComponent } from './Components/list-item-photo/list-item-photo.component';
import { ListItemSkeletonComponent } from './Components/list-item-skeleton/list-item-skeleton.component';
import { MenuButtonComponent } from './Components/menu-button/menu-button.component';
import { PasswordInputComponent } from './Components/password-input/password-input.component';
import { PhotoPreviewComponent } from './Components/photo-preview/photo-preview.component';
import { QRScannerComponent } from './Components/qrscanner/qrscanner.component';
import { SideMenuItemComponent } from './Components/side-menu-item/side-menu-item.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { CoreRoutingModule } from './core-routing.module';
import { GoToHomeMenuButtonComponent } from './Components/go-to-home-menu-button/go-to-home-menu-button.component';
import { PageContainerComponent } from './Components/page-container/page-container.component';

@NgModule({
  declarations: [
    QRScannerComponent,
    BarChartComponent,
    ListItemPhotoComponent,
    ListItemSkeletonComponent,
    PhotoPreviewComponent,
    QRScannerComponent,
    AvatarUploaderComponent,
    PasswordInputComponent,
    DNIFormInputComponent,
    HomeScreenComponent,
    HomeScreenCardComponent,
    SideMenuComponent,
    SideMenuItemComponent,
    MenuButtonComponent,
    UserProfileComponent,
    GoToHomeMenuButtonComponent,
    PageContainerComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ChartsModule,
  ],
  providers: [AppVersion, NavigationBar, AndroidPermissions, BarcodeScanner, ScreenOrientation],
  exports: [
    QRScannerComponent,
    BarChartComponent,
    ListItemPhotoComponent,
    ListItemSkeletonComponent,
    PhotoPreviewComponent,
    QRScannerComponent,
    AvatarUploaderComponent,
    PasswordInputComponent,
    DNIFormInputComponent,
    SideMenuComponent,
    MenuButtonComponent,
    GoToHomeMenuButtonComponent,
    PageContainerComponent,
  ],
})
export class CoreModule {}
