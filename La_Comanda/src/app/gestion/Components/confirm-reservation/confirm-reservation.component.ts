import { Component, OnInit } from '@angular/core';
import { ClientState } from 'src/app/core/Models/Classes/client';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { Reservation } from '../../../core/Models/Classes/reservation';
import { DatabaseService } from '../../../core/Services/database.service';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { Client } from '../../../core/Models/Classes/client';
import { UserRoles } from '../../../core/Models/Enums/user-roles.enum';
import { NotificationService } from '../../../core/Services/notification.service';
import { Mesa } from 'src/app/core/Models/Classes/mesa';

@Component({
  selector: 'gestion-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss'],
})
export class ConfirmReservationComponent implements OnInit {
  public reservations: Reservation[] = null;
  constructor(private dataBase: DatabaseService, private notifications: NotificationService) {}

  async ngOnInit() {
    this.dataBase
      .getDataStream<DBUserDocument>(DataBaseCollections.users, (x) =>
        x.where('user.data.role', '==', UserRoles.CLIENTE).where('user.state', '==', ClientState.NULO)
      )
      .subscribe((users) => {
        this.reservations = users
          .map((x) => x.user as Client)
          .filter((user) => user && user.reservation)
          .map((user) => user.reservation);
        // .map((user) => ({
        //   ...user.reservation,
        //   date: new Date(user.reservation.date as string),
        // }));
      });
  }

  async confirmReservation(reservation: Reservation) {
    const client = (
      await this.dataBase.getDocumentData<DBUserDocument>(DataBaseCollections.users, reservation.clientId)
    ).user as Client;
    client.state = ClientState.MESA_ASIGNADA;
    await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, reservation.clientId, { user: client });
    await this.notifications.presentToast('success', '¡Reservación confirmada con éxito!', 5000, 'md', 'bottom');
  }

  async cancelReservation(reservation: Reservation) {
    const client = (
      await this.dataBase.getDocumentData<DBUserDocument>(DataBaseCollections.users, reservation.clientId)
    ).user as Client;
    const table = await this.dataBase.getDocumentData<Mesa>(DataBaseCollections.mesas, reservation.tableId);
    client.reservation = null;
    table.reservations.splice(
      table.reservations.findIndex((x) => x.ID === reservation.ID),
      1
    );
    await this.dataBase.saveDocument<Mesa>(DataBaseCollections.mesas, reservation.tableId, table);
    await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, reservation.clientId, { user: client });
    await this.notifications.presentToast('success', '¡Reservación cancelada con éxito!', 5000, 'md', 'bottom');
  }
}
