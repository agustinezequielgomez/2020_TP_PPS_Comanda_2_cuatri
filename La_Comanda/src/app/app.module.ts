import { TitleCasePipe } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AccessModule } from './access/access.module';
import { AltasModule } from './altas/altas.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GestionModule } from './gestion/gestion.module';
import { MaterialModule } from './material.module';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es-AR';
registerLocaleData(locale);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    CoreModule,
    BrowserAnimationsModule,
    AccessModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    AltasModule,
    GestionModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TitleCasePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
