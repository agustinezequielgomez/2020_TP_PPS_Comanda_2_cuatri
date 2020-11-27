import { Component, OnInit } from '@angular/core';
import { ClientState, Client } from '../../../core/Models/Classes/client';
import { CameraService } from '../../../core/Services/camera.service';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { Mesas, Mesa } from '../../../core/Models/Classes/mesa';
import { Plugins } from '@capacitor/core';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment-timezone';
const { Haptics } = Plugins;
@Component({
  selector: 'gestion-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit {
  public title: string;
  public clientState: ClientState = null;
  public invalidQr = false;
  public errorMessage: string;
  public specialComponent: string;
  public hasReservation: boolean;
  private tables: Mesas;
  constructor(
    private camera: CameraService,
    public nav: NavController,
    private dataBase: DatabaseService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const client = DataStoreService.Client.CurrentClient;
    this.clientState = client.state;
    if (this.clientState === ClientState.EN_LISTA_DE_ESPERA) {
      this.title = 'Mesa no asignada';
      return null;
    }
    this.tables = await this.dataBase.getCollectionData<Mesa>(DataBaseCollections.mesas);
    await this.scanQrCode();
  }

  async scanQrCode() {
    const client = DataStoreService.Client.CurrentClient;
    this.clientState = client.state;
    const qrCode = 'zx5yTJm3ztFCB9yZR8djnDjdTyayX3'; //await this.camera.scanQrCode();
    if (this.tables.filter((x) => x.qr === qrCode).length === 0) {
      this.invalidQr = true;
      Haptics.vibrate();
      this.errorMessage = 'Lo sentimos, pero no podemos reconcoer ese código QR';
      this.title = 'Código QR inválido';
      return null;
    } else if (
      this.tables.find((table) => table.cliente && table.cliente === client.UID && table.qr === qrCode) === undefined &&
      (client.reservation === null || client.reservation === undefined)
    ) {
      this.invalidQr = true;
      Haptics.vibrate();
      this.errorMessage = `Lo sentimos, pero la mesa asignada por el metre es la mesa N°${client.tableId}`;
      this.title = 'Mesa inválida';
      return null;
    } else if (
      client.reservation !== null &&
      client.reservation !== undefined &&
      this.tables.find((table) => table.qr === qrCode).numero !== client.reservation.tableNumber
    ) {
      this.invalidQr = true;
      Haptics.vibrate();
      this.errorMessage = `Lo sentimos, pero la mesa que reservaste es la mesa N°${client.reservation.tableNumber}`;
      this.title = 'Mesa inválida';
      return null;
    }
    switch (client.state) {
      case ClientState.MESA_ASIGNADA:
        this.invalidQr = false;
        this.hasReservation = client.reservation !== null && client.reservation !== undefined;
        if (this.hasReservation) {
          const reservationTable = this.tables.find((x) => x.numero === client.reservation.tableNumber);
          reservationTable.reservations.sort(
            (r1, r2) => new Date(r1.date as string).getTime() - new Date(r2.date as string).getTime()
          );
          if (reservationTable.reservations[0].ID !== client.reservation.ID) {
            this.title = 'Mesa reservada';
            this.invalidQr = true;
            Haptics.vibrate();
            this.errorMessage = `Lo sentimos, pero la mesa que reservaste esta siendo utilizada por otro comensal en este momento. Por favor escanea el código QR cuando sea la hora de tu reserva.`;
            return null;
          }
          const date = moment(client.reservation.date, 'DD/MM/YYYY HH:mm:ss').tz('America/Argentina/Buenos_Aires');
          const minusFive = moment(client.reservation.date, 'DD/MM/YYYY HH:mm:ss')
            .tz('America/Argentina/Buenos_Aires')
            .subtract(5, 'minutes');
          const plusFive = moment(client.reservation.date, 'DD/MM/YYYY HH:mm:ss')
            .tz('America/Argentina/Buenos_Aires')
            .add(5, 'minutes');
          if (!moment().tz('America/Argentina/Buenos_Aires').isBetween(minusFive, plusFive, 'minutes')) {
            this.title = 'Mesa reservada';
            this.invalidQr = true;
            Haptics.vibrate();
            this.errorMessage = `Lo sentimos, pero aun faltan ${date.diff(
              moment(),
              'minutes'
            )} minutos para tu reserva. Por favor escanea el código QR cuando sea la hora de tu reserva.`;
            return null;
          } else {
            this.invalidQr = false;
            reservationTable.cliente = client.UID;
            reservationTable.reservations.splice(
              reservationTable.reservations.findIndex((x) => x.ID === client.reservation.ID),
              1
            );
            await this.dataBase.saveDocument<Mesa>(
              DataBaseCollections.mesas,
              client.reservation.tableId,
              reservationTable
            );
            client.state = ClientState.EN_MESA;
            client.reservation = null;
            await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
            this.title = 'Mesa vinculada con éxito';
          }
        } else {
          client.state = ClientState.EN_MESA;
          await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
          this.title = 'Mesa vinculada con éxito';
        }
        break;

      case ClientState.EN_MESA:
        this.invalidQr = false;
        if (this.route.snapshot.queryParamMap.has('question')) {
          this.specialComponent = 'question';
          this.title = 'Consultá al mozo';
        }
        break;

      case ClientState.ESPERANDO_PEDIDO:
        this.invalidQr = false;
        if (this.route.snapshot.queryParamMap.has('orderState')) {
          this.specialComponent = 'order_state';
          this.title = 'Estado del pedido';
        }

        if (this.route.snapshot.queryParamMap.has('review')) {
          this.specialComponent = 'client_review';
          this.title = 'Encuesta de satisfacción';
        }

        if (this.route.snapshot.queryParamMap.has('question')) {
          this.specialComponent = 'question';
          this.title = 'Consultá al mozo';
        }
        break;

      case ClientState.COMIENDO:
        this.invalidQr = false;
        if (this.route.snapshot.queryParamMap.has('orderState')) {
          this.specialComponent = 'order_state';
          this.title = 'Estado del pedido';
        }

        if (this.route.snapshot.queryParamMap.has('review')) {
          this.specialComponent = 'client_review';
          this.title = 'Encuesta de satisfacción';
        }

        if (this.route.snapshot.queryParamMap.has('pay')) {
          this.specialComponent = 'pay';
          this.title = 'Pedir cuenta';
        }
        break;
    }
  }
}
