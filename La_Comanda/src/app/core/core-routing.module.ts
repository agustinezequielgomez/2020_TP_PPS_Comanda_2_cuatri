import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './Components/home-screen/home-screen.component';
import { QRScannerComponent } from './Components/qrscanner/qrscanner.component';
import { AcceptRejectClientsComponent } from './Components/accept-reject-clients/accept-reject-clients.component';
import { GoIntoWaitingListComponent } from './Components/go-into-waiting-list/go-into-waiting-list.component';
import { AssingTableToClientComponent } from './Components/assing-table-to-client/assing-table-to-client.component';
import { ClientTableComponent } from './Components/client-table/client-table.component';
import { FoodMenuComponent } from './Components/food-menu/food-menu.component';

const routes: Routes = [
  {
    path: 'userAdmin',
    component: AcceptRejectClientsComponent,
  },
  {
    path: 'waitingListEnter',
    component: GoIntoWaitingListComponent,
  },
  {
    path: 'assingTable',
    component: AssingTableToClientComponent,
  },
  {
    path: 'clientTable',
    component: ClientTableComponent,
  },
  {
    path: 'foodMenu',
    component: FoodMenuComponent,
  },
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
