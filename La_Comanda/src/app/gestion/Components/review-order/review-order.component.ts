import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { Order, OrderState } from '../../../core/Models/Classes/order';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { NotificationService } from '../../../core/Services/notification.service';
import { TipoAlimento } from 'src/app/core/Models/Classes/alimento';
import { UserRoles } from '../../../core/Models/Enums/user-roles.enum';

@Component({
  selector: 'gestion-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss'],
})
export class ReviewOrderComponent implements OnInit {
  public pendingOrders: Order[] = null;
  constructor(private dataBase: DatabaseService, private notification: NotificationService) {}

  async ngOnInit() {
    this.dataBase
      .getDataStream<{ order: Order }>(DataBaseCollections.orders, (x) =>
        x.where('order.state', '==', OrderState.PEDIDO)
      )
      .subscribe((pendingOrders) => {
        this.pendingOrders = pendingOrders.map((order) => order.order);
      });
  }

  async confirmOrder(order: Order) {
    const notificationToRoles: UserRoles[] = [];
    if (order.items.some((x) => x.tipo === TipoAlimento.COMIDA)) notificationToRoles.push(UserRoles.COCINERO);
    if (order.items.some((x) => x.tipo === TipoAlimento.BEBIDA)) notificationToRoles.push(UserRoles.BARTENDER);
    order.state = OrderState.CONFIRMADO;
    console.log(order);
    await this.dataBase.saveDocument(DataBaseCollections.orders, order.orderId, { order });
    await this.notification.sendPushNotificationToRoles(
      notificationToRoles,
      { title: 'Pedido confirmado', body: 'Hay un nuevo pedido confirmado para que prepares' },
      'prepareFood'
    );
    await this.notification.presentToast('success', '¡Pedido confirmado!', 5000, 'md', 'bottom');
  }
}
