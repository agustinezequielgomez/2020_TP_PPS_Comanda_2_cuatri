import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { Order } from 'src/app/core/Models/Classes/order';
import { CameraService } from '../../../core/Services/camera.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { OrderState } from '../../../core/Models/Classes/order';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'gestion-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss'],
})
export class PayOrderComponent implements OnInit {
  public order: Order = null;
  public tip: number = null;
  public totalPrice: number;
  constructor(
    private dataBase: DatabaseService,
    private camera: CameraService,
    private notification: NotificationService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.order = (
      await this.dataBase.getDocumentData<{ order: Order }>(
        DataBaseCollections.orders,
        DataStoreService.Client.CurrentClient.orderId
      )
    ).order;
    this.totalPrice = this.order.totalPrice;
  }

  async addTip() {
    const tip: number = parseInt(await this.camera.scanQrCode(), 10);
    if (!isNaN(tip)) {
      this.tip = tip;
      this.totalPrice += this.totalPrice * (tip / 100);
    } else {
      await this.notification.presentToast(
        'danger',
        'Lo sentimos, pero ese no es un QR de propina',
        7500,
        'md',
        'bottom'
      );
    }
  }

  async payOrder() {
    this.order.state = OrderState.PAGADO;
    this.order.totalPaid = this.totalPrice;
    await this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, this.order.orderId, {
      order: this.order,
    });
    await this.notification.presentToast(
      'success',
      '¡Pedido pagado con éxito! Podrás retirarte del local cuando el mozo confirme el pago',
      10000,
      'md',
      'bottom'
    );
    this.nav.navigateBack('home');
  }
}
