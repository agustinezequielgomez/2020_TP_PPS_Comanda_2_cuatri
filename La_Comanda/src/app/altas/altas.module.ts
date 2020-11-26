import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';
import { AltasRoutingModule } from './altas-routing.module';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ClienteAnonimoComponent } from './Components/cliente-anonimo/cliente-anonimo.component';
import { EmpleadoComponent } from './Components/empleado/empleado.component';
import { MesaComponent } from './Components/mesa/mesa.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ComidaComponent } from './Components/comida/comida.component';
import { BebidaComponent } from './Components/bebida/bebida.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteAnonimoComponent,
    EmpleadoComponent,
    MesaComponent,
    ComidaComponent,
    BebidaComponent,
  ],
  imports: [
    CommonModule,
    AltasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    IonicModule.forRoot(),
    NgxQRCodeModule,
  ],
  providers: [Base64ToGallery, AndroidPermissions],
  exports: [
    ClienteComponent,
    ClienteAnonimoComponent,
    EmpleadoComponent,
    MesaComponent,
    ComidaComponent,
    BebidaComponent,
  ],
})
export class AltasModule {}
