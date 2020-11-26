import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptRejectClientsComponent } from './Components/accept-reject-clients/accept-reject-clients.component';
import { AssingTableToClientComponent } from './Components/assing-table-to-client/assing-table-to-client.component';
import { ClientTableComponent } from './Components/client-table/client-table.component';
import { ConfirmPaymentComponent } from './Components/confirm-payment/confirm-payment.component';
import { DeliverOrderComponent } from './Components/deliver-order/deliver-order.component';
import { FoodMenuComponent } from './Components/food-menu/food-menu.component';
import { GoIntoWaitingListComponent } from './Components/go-into-waiting-list/go-into-waiting-list.component';
import { PrepareFoodComponent } from './Components/prepare-food/prepare-food.component';
import { ReviewOrderComponent } from './Components/review-order/review-order.component';
import { WaiterQuestionComponent } from './Components/waiter-question/waiter-question.component';
import { ResrveTableComponent } from './Components/resrve-table/resrve-table.component';
import { ConfirmReservationComponent } from './Components/confirm-reservation/confirm-reservation.component';

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
    path: 'reviewOrder',
    component: ReviewOrderComponent,
  },
  {
    path: 'waiterQuestion',
    component: WaiterQuestionComponent,
  },
  {
    path: 'prepareFood',
    component: PrepareFoodComponent,
  },
  {
    path: 'deliverOrder',
    component: DeliverOrderComponent,
  },
  {
    path: 'confirmPayment',
    component: ConfirmPaymentComponent,
  },
  {
    path: 'reserve',
    component: ResrveTableComponent,
  },
  {
    path: 'confirmReservation',
    component: ConfirmReservationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
