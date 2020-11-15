import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptRejectClientsComponent } from './Components/accept-reject-clients/accept-reject-clients.component';
import { AssingTableToClientComponent } from './Components/assing-table-to-client/assing-table-to-client.component';
import { ClientTableComponent } from './Components/client-table/client-table.component';
import { FoodMenuComponent } from './Components/food-menu/food-menu.component';
import { GoIntoWaitingListComponent } from './Components/go-into-waiting-list/go-into-waiting-list.component';
import { GestionRoutingModule } from './gestion-routing.module';
import { FoodMenuModalComponent } from './Components/food-menu-modal/food-menu-modal.component';
import { OrderFoodComponent } from './Components/order-food/order-food.component';
import { OrderFoodItemComponent } from './Components/order-food-item/order-food-item.component';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core/core.module';
import { ReviewOrderComponent } from './Components/review-order/review-order.component';
import { MaterialModule } from '../material.module';
import { OrderStateComponent } from './Components/order-state/order-state.component';
import { ClientReviewComponent } from './Components/client-review/client-review.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientQuestionComponent } from './Components/client-question/client-question.component';
import { WaiterQuestionComponent } from './Components/waiter-question/waiter-question.component';
import { PrepareFoodComponent } from './Components/prepare-food/prepare-food.component';

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
