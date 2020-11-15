import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './Components/home-screen/home-screen.component';
import { QRScannerComponent } from './Components/qrscanner/qrscanner.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeScreenComponent,
  },
  {
    path: 'qr',
    component: QRScannerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
