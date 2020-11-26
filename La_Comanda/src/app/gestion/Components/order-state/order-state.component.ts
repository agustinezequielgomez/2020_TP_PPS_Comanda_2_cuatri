import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { Order, OrderState } from '../../../core/Models/Classes/order';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientState } from 'src/app/core/Models/Classes/client';
import { DBUserDocument } from '../../../core/Models/Classes/user';

@Component({
  selector: 'gestion-order-state',
  templateUrl: './order-state.component.html',
  styleUrls: ['./order-state.component.scss'],
  animations: [
    trigger('switchAnimation', [
      state(
        'fadeIn',
        style({
          opacity: '1',
        })
      ),
      transition('void => *', [style({ opacity: '0' }), animate('500ms 200ms ease-in-out')]),
    ]),
  ],
})
export class OrderStateComponent implements OnInit {
  public orderState: OrderState;
  public remainingTime: number;
  private order: Order;
  constructor(private dataBase: DatabaseService) {}

  ngOnInit() {
    this.dataBase
      .getDocumentDataStream<{ order: Order }>(
        DataBaseCollections.orders,
        DataStoreService.Client.CurrentClient.orderId
      )
      .subscribe((order) => {
        console.log(order);
        this.order = order.order;
        this.orderState = order.order.state;
        this.remainingTime = order.order.estimated_time;
      });
  }

  async confirmReception() {
    this.order.state = OrderState.ENTREGADO;
    DataStoreService.Client.CurrentClient.state = ClientState.COMIENDO;
    await this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, this.order.orderId, {
      order: this.order,
    });
    await this.dataBase.saveDocument<DBUserDocument>(
      DataBaseCollections.users,
      DataStoreService.Client.CurrentClient.UID,
      { user: DataStoreService.Client.CurrentClient }
    );
  }
}
