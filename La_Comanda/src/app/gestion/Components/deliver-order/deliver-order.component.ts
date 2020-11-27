import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { Order, OrderState } from '../../../core/Models/Classes/order';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { Mesa } from '../../../core/Models/Classes/mesa';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../../core/Services/notification.service';

@Component({
  selector: 'gestion-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.scss'],
})
export class DeliverOrderComponent implements OnInit {
  public ordersReady: Map<Order, Mesa> = null;
  public ordersReadyIterable: Order[] = [];
  constructor(private dataBase: DatabaseService, private notification: NotificationService) {}

  ngOnInit() {
    this.dataBase
      .getDataStream<{ order: Order }>(DataBaseCollections.orders, (x) =>
        x.where('order.state', '==', OrderState.TERMINADO)
      )
      .pipe(map((objs) => objs.map((order) => order.order)))
      .subscribe(async (ordersReady) => {
        this.ordersReady = new Map<Order, Mesa>();
        if (ordersReady.length > 0) {
          for await (const order of ordersReady) {
            const table = (
              await this.dataBase.queryCollection<Mesa>(DataBaseCollections.mesas, (x) =>
                x.where('numero', '==', order.tableId).limit(1)
              )
            )[0].data;
            this.ordersReady.set(order, table);
            this.ordersReadyIterable.push(order);
          }
        }
      });
  }

  async deliverOrder(order: Order) {
    order.state = OrderState.ENTREGADO_CONFIRMACION;
    await this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, order.orderId, { order });
    await this.notification.presentToast('success', '¡Pedido entregado con éxito!', 5000, 'md', 'bottom');
  }
}
