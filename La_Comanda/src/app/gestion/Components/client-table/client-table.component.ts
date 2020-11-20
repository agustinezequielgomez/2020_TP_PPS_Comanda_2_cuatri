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
    const qrCode = await this.camera.scanQrCode();
    if (this.tables.filter((x) => x.qr === qrCode).length === 0) {
      this.invalidQr = true;
      Haptics.vibrate();
      this.errorMessage = 'Lo sentimos, pero no podemos reconcoer ese código QR';
      this.title = 'Código QR inválido';
      return null;
    } else if (
      this.tables.find((table) => table.cliente && table.cliente === client.UID && table.qr === qrCode) === undefined
    ) {
      this.invalidQr = true;
      Haptics.vibrate();
      this.errorMessage = `Lo sentimos, pero la mesa asignada por el metre es la mesa N°${client.tableId}`;
      this.title = 'Mesa inválida';
      return null;
    }
    switch (client.state) {
      case ClientState.MESA_ASIGNADA:
        this.invalidQr = false;
        client.state = ClientState.EN_MESA;
        this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
        this.title = 'Mesa vinculada con éxito';
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
    }
  }
}
