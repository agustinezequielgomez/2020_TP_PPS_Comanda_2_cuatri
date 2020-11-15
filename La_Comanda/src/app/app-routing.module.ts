import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gestion',
    loadChildren: () => import('./gestion/gestion.module').then((m) => m.GestionModule),
  },
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then((m) => m.AccessModule),
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'alta',
    loadChildren: () => import('./altas/altas.module').then((m) => m.AltasModule),
  },
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
