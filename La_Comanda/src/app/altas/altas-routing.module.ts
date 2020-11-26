import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BebidaComponent } from './Components/bebida/bebida.component';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ComidaComponent } from './Components/comida/comida.component';
import { EmpleadoComponent } from './Components/empleado/empleado.component';
import { MesaComponent } from './Components/mesa/mesa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliente',
        component: ClienteComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'empleado',
        component: EmpleadoComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'mesa',
        component: MesaComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'comida',
        component: ComidaComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'bebida',
        component: BebidaComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltasRoutingModule {}
