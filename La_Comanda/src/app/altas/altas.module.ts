import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltasRoutingModule } from './altas-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    AltasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    IonicModule.forRoot(),
  ]
})
export class AltasModule { }
