import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptRejectClientsComponent } from './Components/accept-reject-clients/accept-reject-clients.component';
import { GoIntoWaitingListComponent } from './Components/go-into-waiting-list/go-into-waiting-list.component';
import { AssingTableToClientComponent } from './Components/assing-table-to-client/assing-table-to-client.component';
import { ClientTableComponent } from './Components/client-table/client-table.component';
import { FoodMenuComponent } from './Components/food-menu/food-menu.component';
import { ReviewOrderComponent } from './Components/review-order/review-order.component';
import { WaiterQuestionComponent } from './Components/waiter-question/waiter-question.component';
import { PrepareFoodComponent } from './Components/prepare-food/prepare-food.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
