import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/Models/Classes/order';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { OrderState } from '../../../core/Models/Classes/order';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { Client, ClientState } from 'src/app/core/Models/Classes/client';
import { Mesa } from '../../../core/Models/Classes/mesa';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { NotificationService } from '../../../core/Services/notification.service';

@Component({
  selector: 'gestion-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
})
export class ConfirmPaymentComponent implements OnInit {
  public pendingOrders: Order[] = null;
  public parse = parseFloat;
  constructor(
    private dataBase: DatabaseService,
    private creator: ComponentCreatorService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.dataBase
      .getDataStream<{ order: Order }>(DataBaseCollections.orders, (x) =>
        x.where('order.state', '==', OrderState.PAGADO)
      )
      .subscribe((orders) => (this.pendingOrders = orders.map((x) => x.order)));
  }

  async confirmPayment(order: Order) {
    const loader = await this.creator.createLoader(
      'md',
      'Procesando pago...',
      true,
      true,
      'crescent',
      false,
      'ion-loader'
    );
    await loader.present();
    order.state = OrderState.CERRADO;
    const client: Client = (
      await this.dataBase.getDocumentData<DBUserDocument>(DataBaseCollections.users, order.client)
    ).user as Client;
    const table: { id: string; data: Mesa } = (
      await this.dataBase.queryCollection<Mesa>(DataBaseCollections.mesas, (x) =>
        x.where('numero', '==', order.tableId)
      )
    )[0];
    client.state = ClientState.NULO;
    table.data.cliente = null;
    await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
    await this.dataBase.saveDocument<Mesa>(DataBaseCollections.mesas, table.id, table.data);
    await this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, order.orderId, { order });
    await loader.dismiss();
    await this.notification.presentToast('success', '¡Pago procesado con éxito!', 5000, 'md', 'bottom');
  }
}
