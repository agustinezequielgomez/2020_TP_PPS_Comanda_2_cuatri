import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { Order } from 'src/app/core/Models/Classes/order';
import { OrderState } from '../../../core/Models/Classes/order';
import { Alimento, FoodState, TipoAlimento } from '../../../core/Models/Classes/alimento';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { NotificationService } from '../../../core/Services/notification.service';

@Component({
  selector: 'gestion-prepare-food',
  templateUrl: './prepare-food.component.html',
  styleUrls: ['./prepare-food.component.scss'],
})
export class PrepareFoodComponent implements OnInit {
  public orders: Order[];
  public pendingFood: { order: Order; food: Alimento[] }[] = null;
  public inProgressFood: { order: Order; food: Alimento[] }[] = null;
  public employeeRole: UserRoles;
  public anyPendingFood: boolean;
  public anyInProgressFood: boolean;
  constructor(private dataBase: DatabaseService, private notification: NotificationService) {}

  ngOnInit() {
    this.employeeRole = DataStoreService.User.CurrentUser.data.role;
    console.log(this.employeeRole);
    const typeOfFood: TipoAlimento =
      this.employeeRole === UserRoles.COCINERO ? TipoAlimento.COMIDA : TipoAlimento.BEBIDA;
    this.dataBase
      .getDataStream<{ order: Order }>(DataBaseCollections.orders, (x) =>
        x.where('order.state', 'in', [OrderState.CONFIRMADO, OrderState.EN_PROGRESO])
      )
      .subscribe((orders) => {
        this.orders = orders.map((x) => x.order);
        this.pendingFood = this.orders.map((x) => ({
          order: x,
          food: x.items.filter((y) => y.estado_preparacion === FoodState.TODO && y.tipo === typeOfFood),
        }));
        this.inProgressFood = this.orders.map((x) => ({
          order: x,
          food: x.items.filter((y) => y.estado_preparacion === FoodState.IN_PROGRESS && y.tipo === typeOfFood),
        }));
        this.anyInProgressFood = this.inProgressFood.map((x) => x.food).filter((x) => x.length > 0).length > 0;
        this.anyPendingFood = this.pendingFood.map((x) => x.food).filter((x) => x.length > 0).length > 0;
      });
  }

  foodInProgress(food: Alimento, orderId: string) {
    const order = this.orders.find((x) => x.orderId === orderId);
    const foodIndex = order.items.findIndex((x) => x.qr === food.qr && x.estado_preparacion === FoodState.TODO);
    order.items[foodIndex].estado_preparacion = FoodState.IN_PROGRESS;
    if (order.state === OrderState.CONFIRMADO) {
      order.state = OrderState.EN_PROGRESO;
    }

    this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, orderId, { order });
  }

  foodCompleted(food: Alimento, orderId: string) {
    const order = this.orders.find((x) => x.orderId === orderId);
    const foodIndex = order.items.findIndex((x) => x.qr === food.qr && x.estado_preparacion === FoodState.IN_PROGRESS);
    order.items[foodIndex].estado_preparacion = FoodState.COMPLETED;
    if (
      order.state === OrderState.EN_PROGRESO &&
      order.items.every((x) => x.estado_preparacion === FoodState.COMPLETED)
    ) {
      order.state = OrderState.TERMINADO;
      this.notification.sendPushNotificationToRoles(
        [UserRoles.MOZO],
        { title: 'Pedido finalizado', body: `El pedido de la mesa N°${order.tableId} está listo para ser entregado` },
        ''
      );
    }

    this.dataBase.saveDocument<{ order: Order }>(DataBaseCollections.orders, orderId, { order });
  }
}
