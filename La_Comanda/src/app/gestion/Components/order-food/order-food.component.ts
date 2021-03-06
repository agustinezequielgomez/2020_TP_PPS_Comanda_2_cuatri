import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { Alimento, FoodState } from '../../../core/Models/Classes/alimento';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { CameraService } from '../../../core/Services/camera.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { Order, OrderState } from '../../../core/Models/Classes/order';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { UserRoles } from '../../../core/Models/Enums/user-roles.enum';
import { NavController } from '@ionic/angular';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { ClientState } from '../../../core/Models/Classes/client';
import { Guid } from 'guid-typescript';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';

@Component({
  selector: 'gestion-order-food',
  templateUrl: './order-food.component.html',
  styleUrls: ['./order-food.component.scss'],
})
export class OrderFoodComponent implements OnInit {
  public foodMenu: Alimento[] = [];
  public orderedFood: Map<Alimento, number> = new Map<Alimento, number>();
  public bindedOrderedFood: Alimento[];
  public orderTotal = 0;
  constructor(
    private dataBase: DatabaseService,
    private camera: CameraService,
    private notification: NotificationService,
    private nav: NavController,
    private creator: ComponentCreatorService
  ) {}

  async ngOnInit() {
    const foods = await this.dataBase.getCollectionData<Alimento>(DataBaseCollections.comidas);
    const drinks = await this.dataBase.getCollectionData<Alimento>(DataBaseCollections.bebidas);
    this.foodMenu.push(...foods, ...drinks);
  }

  async scanFood() {
    try {
      const qr = await this.camera.scanQrCode();
      this.validateFood(qr);
      if (this.foodMenu.find((x) => x.qr === qr) && !this.orderedFood.has(this.foodMenu.find((x) => x.qr === qr))) {
        this.orderedFood.set(
          this.foodMenu.find((x) => x.qr === qr),
          1
        );
        this.bindedOrderedFood = Array.from(this.orderedFood.keys());
        this.calculateTotal();
      }
    } catch (err) {
      console.log('COMIDA INVALIDA');
    }
  }

  calculateTotal() {
    let total = 0;
    for (const item of this.orderedFood.keys()) {
      total += this.orderedFood.get(item) * item.precio;
    }
    this.orderTotal = total;
  }

  removeItemFromOrder(food: Alimento) {
    this.orderedFood.delete(food);
    this.bindedOrderedFood = Array.from(this.orderedFood.keys());
    this.calculateTotal();
  }

  changeAmmount(food: Alimento, ammount: number) {
    this.orderedFood.set(food, ammount);
    this.calculateTotal();
  }

  async validateFood(qr: string) {
    if (!this.foodMenu.some((x) => x.qr === qr)) {
      await this.notification.presentToast(
        'danger',
        'Lo sentimos, pero ese código QR no pertenece a nuestro menú',
        0,
        'md',
        'bottom'
      );
      throw new Error('INVALID FOOD');
    }
  }

  async orderFood() {
    const loader = await this.creator.createLoader(
      'md',
      'Haciendo pedido...',
      true,
      true,
      'crescent',
      false,
      'ion-loader'
    );
    loader.present();
    try {
      const orderItems: Alimento[] = [];
      for (const item of this.orderedFood.keys()) {
        const ammount = this.orderedFood.get(item);
        console.log(item, ammount);
        for (let index = 0; index < ammount; index++) {
          item.estado_preparacion = FoodState.TODO;
          orderItems.push(item);
        }
      }
      const orderId = Guid.raw();
      const order: Order = {
        orderId,
        items: orderItems,
        totalPrice: this.orderTotal,
        client: DataStoreService.Client.CurrentClient.UID,
        estimated_time: Math.max(
          ...orderItems.filter((x) => x.tiempo_elaboracion).map((item) => item.tiempo_elaboracion)
        ),
        ordered_at: new Date(),
        tableId: DataStoreService.Client.CurrentClient.tableId,
        state: OrderState.PEDIDO,
      };
      await this.dataBase.saveDocument(DataBaseCollections.orders, orderId, { order });
      DataStoreService.Client.CurrentClient.state = ClientState.ESPERANDO_PEDIDO;
      DataStoreService.Client.CurrentClient.orderId = orderId;
      await this.dataBase.saveDocument<DBUserDocument>(
        DataBaseCollections.users,
        DataStoreService.Client.CurrentClient.UID,
        { user: DataStoreService.Client.CurrentClient }
      );
      await this.notification.sendPushNotificationToRoles(
        [UserRoles.MOZO],
        { title: 'Nuevo pedido', body: 'Nuevo pedido a la espera de ser confirmado' },
        'reviewOrder'
      );
      loader.dismiss();
      await this.notification.presentToast(
        'success',
        'El mozo va a confirmarlo y deberías recibirlo en unos minutos',
        0,
        'md',
        'bottom',
        'Pedido realizado con éxito'
      );
      this.orderedFood.clear();
      this.bindedOrderedFood = [];
      this.nav.navigateBack('home');
    } catch (err) {
      loader.dismiss();
      console.log(err);
    }
  }
}
