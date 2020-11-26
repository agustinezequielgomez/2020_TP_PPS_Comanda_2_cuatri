import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {} from '@ionic/angular/';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AccessModule } from './access/access.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { AltasModule } from './altas/altas.module';
import { TitleCasePipe } from '@angular/common';
import { GestionModule } from './gestion/gestion.module';
// import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AccessModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AltasModule,
    GestionModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TitleCasePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Base64ToGallery
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
