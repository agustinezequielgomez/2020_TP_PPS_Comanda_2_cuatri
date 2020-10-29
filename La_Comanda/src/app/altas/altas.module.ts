import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';
import { AltasRoutingModule } from './altas-routing.module';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ClienteAnonimoComponent } from './Components/cliente-anonimo/cliente-anonimo.component';



@NgModule({
  declarations: [
    ClienteComponent,
    ClienteAnonimoComponent
  ],
  imports: [
    CommonModule,
    AltasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    IonicModule.forRoot(),
  ],
  providers: [ ],
  exports: [
    ClienteComponent,
    ClienteAnonimoComponent
  ]
})
export class AltasModule { }
