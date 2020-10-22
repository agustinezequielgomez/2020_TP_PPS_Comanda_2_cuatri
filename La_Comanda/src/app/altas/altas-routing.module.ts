import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './Components/cliente/cliente.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliente',
        component: ClienteComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltasRoutingModule { }
