import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Client, ClientState } from '../../../core/Models/Classes/client';
import { Mesa, Mesas } from '../../../core/Models/Classes/mesa';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DatabaseService } from '../../../core/Services/database.service';
import { AlertInput } from '@ionic/core';
import { DBUserDocument } from '../../../core/Models/Classes/user';
import { DocumentChangeType } from '@angular/fire/firestore';
import { NotificationService } from '../../../core/Services/notification.service';
@Component({
  selector: 'gestion-assing-table-to-client',
  templateUrl: './assing-table-to-client.component.html',
  styleUrls: ['./assing-table-to-client.component.scss'],
})
export class AssingTableToClientComponent implements OnInit {
  public waitingClients: Client[] = null;
  public availableTables: { ID: string; mesa: Mesa }[] = null;
  constructor(
    private dataBase: DatabaseService,
    private alertController: AlertController,
    private notficiation: NotificationService,
    public nav: NavController
  ) {}

  ngOnInit() {
    this.dataBase.getDataStream<Client>(DataBaseCollections.waiting_list).subscribe((waitingClients) => {
      this.waitingClients = waitingClients;
      console.log(this.waitingClients);
    });

    this.dataBase
      .getComplexDataStream<Mesa>(DataBaseCollections.mesas, ['added', 'modified'], (x) =>
        x.where('cliente', '==', null)
      )
      .subscribe((availableTables) => {
        this.availableTables = availableTables
          .map((x) => ({ ID: x.ID, mesa: x.DATA }))
          .sort((x, y) => (x.mesa.numero < y.mesa.numero ? 0 : 1));
      });
  }

  async createModal(client: Client) {
    let selectedTable: { ID: string; mesa: Mesa } = null;
    const radioButtons = this.availableTables
      .map<Mesa>((x) => x.mesa)
      .map<AlertInput>((table) => ({
        type: 'radio',
        name: `Mesa_${table.numero}`,
        label: `Mesa N°${table.numero}`,
        id: table.numero.toString(),
        handler: (input) =>
          (selectedTable = this.availableTables.find((x) => x.mesa.numero === parseInt(input.id, 10))),
      }));
    (
      await this.alertController.create({
        animated: true,
        backdropDismiss: false,
        header: 'Mesas disponibles',
        inputs: radioButtons,
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            cssClass: 'assing-table-modal-close',
          },
          {
            text: 'Confirmar',
            cssClass: 'assing-table-modal-confirm',
            handler: () => this.assignTable(client, selectedTable),
          },
        ],
        cssClass: 'assing-table-modal',
      })
    ).present();
  }

  async assignTable(client: Client, { ID, mesa }: { ID: string; mesa: Mesa }) {
    client.tableId = mesa.numero;
    client.state = ClientState.MESA_ASIGNADA;
    mesa.cliente = client.UID;
    await this.dataBase.deleteDocument(DataBaseCollections.waiting_list, client.UID);
    await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
    await this.dataBase.saveDocument<Mesa>(DataBaseCollections.mesas, ID, mesa);
    await this.notficiation.presentToast(
      'success',
      `Cliente ${client.data.name} asignado con éxito a mesa ${mesa.numero}`,
      10000,
      'md',
      'bottom'
    );
  }

  public noTables = async () =>
    await this.notficiation.presentToast('warning', 'Actualmente no hay mesas disponibles', 10000, 'md', 'bottom');
}
