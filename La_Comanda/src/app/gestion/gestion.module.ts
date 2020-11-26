import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';
import { AcceptRejectClientsComponent } from './Components/accept-reject-clients/accept-reject-clients.component';
import { AssingTableToClientComponent } from './Components/assing-table-to-client/assing-table-to-client.component';
import { ClientQuestionComponent } from './Components/client-question/client-question.component';
import { ClientReviewComponent } from './Components/client-review/client-review.component';
import { ClientTableComponent } from './Components/client-table/client-table.component';
import { ConfirmPaymentComponent } from './Components/confirm-payment/confirm-payment.component';
import { DeliverOrderComponent } from './Components/deliver-order/deliver-order.component';
import { FoodMenuModalComponent } from './Components/food-menu-modal/food-menu-modal.component';
import { FoodMenuComponent } from './Components/food-menu/food-menu.component';
import { GoIntoWaitingListComponent } from './Components/go-into-waiting-list/go-into-waiting-list.component';
import { OrderFoodItemComponent } from './Components/order-food-item/order-food-item.component';
import { OrderFoodComponent } from './Components/order-food/order-food.component';
import { OrderStateComponent } from './Components/order-state/order-state.component';
import { PayOrderComponent } from './Components/pay-order/pay-order.component';
import { PrepareFoodComponent } from './Components/prepare-food/prepare-food.component';
import { ReviewOrderComponent } from './Components/review-order/review-order.component';
import { WaiterQuestionComponent } from './Components/waiter-question/waiter-question.component';
import { GestionRoutingModule } from './gestion-routing.module';
import { ResrveTableComponent } from './Components/resrve-table/resrve-table.component';
import { ConfirmReservationComponent } from './Components/confirm-reservation/confirm-reservation.component';

@NgModule({
  declarations: [
    AcceptRejectClientsComponent,
    GoIntoWaitingListComponent,
    AssingTableToClientComponent,
    ClientTableComponent,
    FoodMenuComponent,
    FoodMenuModalComponent,
    OrderFoodComponent,
    OrderFoodItemComponent,
    ReviewOrderComponent,
    OrderStateComponent,
    ClientReviewComponent,
    ClientQuestionComponent,
    WaiterQuestionComponent,
    PrepareFoodComponent,
    DeliverOrderComponent,
    PayOrderComponent,
    ConfirmPaymentComponent,
    ResrveTableComponent,
    ConfirmReservationComponent,
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    IonicModule.forRoot(),
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class GestionModule {}
