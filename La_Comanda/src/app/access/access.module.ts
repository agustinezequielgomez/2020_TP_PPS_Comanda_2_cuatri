import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AltasModule } from '../altas/altas.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';
import { AccessRoutingModule } from './access-routing.module';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { LoginScreenComponent } from './Components/login-screen/login-screen.component';
import { SplashScreenComponent } from './Components/splash-screen/splash-screen.component';

@NgModule({
  declarations: [SplashScreenComponent, LoginScreenComponent, LoginFormComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AccessRoutingModule,
    CoreModule,
    AltasModule,
  ],
  exports: [SplashScreenComponent],
})
export class AccessModule {}
