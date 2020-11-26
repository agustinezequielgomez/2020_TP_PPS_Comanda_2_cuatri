import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { Mesa } from '../../../core/Models/Classes/mesa';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { MatStepper } from '@angular/material/stepper';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { Guid } from 'guid-typescript';
import { DataStoreService } from 'src/app/core/Services/data-store.service';
import { Reservation } from '../../../core/Models/Classes/reservation';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { NotificationService } from '../../../core/Services/notification.service';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'gestion-resrve-table',
  templateUrl: './resrve-table.component.html',
  styleUrls: ['./resrve-table.component.scss'],
})
export class ResrveTableComponent implements OnInit {
  public tables: Map<string, Mesa> = null;
  public tablesIterator: Mesa[] = null;
  public selectedTable: Mesa = null;
  public selectedDate: Date = null;
  public minDate: Date = new Date();
  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private dataBase: DatabaseService,
    private creator: ComponentCreatorService,
    private notification: NotificationService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    const dbTables = await this.dataBase.queryCollection<Mesa>(DataBaseCollections.mesas, (x) =>
      x.orderBy('numero', 'asc')
    );
    this.tables = new Map<string, Mesa>();
    for (const table of dbTables) {
      this.tables.set(table.id, table.data);
    }
    this.tablesIterator = Array.from(this.tables.values());
  }

  goToCalendarStep = () => this.stepper.next();
  selectDate = (event) => console.log(event);
  goToTableStep = () => {
    this.stepper.previous();
    this.selectedTable = null;
    this.selectedDate = null;
  };

  async confirmReservation() {
    const loader = await this.creator.createLoader(
      'md',
      'Reservando mesa...',
      true,
      true,
      'crescent',
      false,
      'ion-loader'
    );
    try {
      loader.present();
      let tableDocumentId: string;
      for (const tableKey of this.tables.keys()) {
        if (this.tables.get(tableKey).qr === this.selectedTable.qr) {
          tableDocumentId = tableKey;
          break;
        }
      }
      const reservation: Reservation = {
        ID: Guid.raw(),
        clientId: DataStoreService.Client.CurrentClient.UID,
        tableId: tableDocumentId,
        tableNumber: this.selectedTable.numero,
        date: this.selectedDate.toLocaleString('es-AR'),
        clientName: `${DataStoreService.Client.CurrentClient.data.name} ${DataStoreService.Client.CurrentClient.data.lastName}`,
      };
      DataStoreService.Client.CurrentClient.reservation = reservation;
      this.selectedTable.reservations = this.selectedTable.reservations
        ? [...this.selectedTable.reservations, reservation]
        : [reservation];
      await this.dataBase.saveDocument<Mesa>(DataBaseCollections.mesas, tableDocumentId, this.selectedTable);
      await this.dataBase.saveDocument<DBUserDocument>(
        DataBaseCollections.users,
        DataStoreService.Client.CurrentClient.UID,
        {
          user: DataStoreService.Client.CurrentClient,
        }
      );
      await this.notification.sendPushNotificationToRoles(
        [UserRoles.DUEÑO, UserRoles.SUPERVISOR],
        { title: 'Nueva reserva realizada', body: 'Se realizó una nueva reserva y debe ser aprobada' },
        'confirmReservation'
      );
      await loader.dismiss();
      await this.notification.presentToast('success', '¡Reserva realizada con éxito!', 5000, 'md', 'bottom');
      this.nav.navigateBack('home');
    } catch (err) {
      await this.notification.presentToast('warning', 'Error al intentar hacer la reserva', 5000, 'md', 'bottom');
    }
  }
}
