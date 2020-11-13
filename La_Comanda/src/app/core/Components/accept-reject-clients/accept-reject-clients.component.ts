import { Component, OnInit } from '@angular/core';
import { Client } from '../../Models/Classes/client';
import { DBUserDocument } from '../../Models/Classes/user';
import { DataBaseCollections } from '../../Models/Enums/data-base-collections.enum';
import { DatabaseService } from '../../Services/database.service';
import { NotificationService } from '../../Services/notification.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accept-reject-clients',
  templateUrl: './accept-reject-clients.component.html',
  styleUrls: ['./accept-reject-clients.component.scss'],
})
export class AcceptRejectClientsComponent implements OnInit {
  public clientList: Client[] = null;
  public dummyArray: Array<any> = Array(15);
  constructor(
    private dataBase: DatabaseService,
    private notification: NotificationService,
    public nav: NavController
  ) {}

  async ngOnInit() {
    this.dataBase
      .getDataStream<DBUserDocument>(DataBaseCollections.users, (x) => x.where('user.enabled', '==', null))
      .subscribe((documents) => (this.clientList = documents.map((doc) => doc.user as Client)));
  }

  async resolveClient(client: Client, accepted: boolean) {
    try {
      client.enabled = accepted;
      await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, client.UID, { user: client });
      await this.notification.sendEmail(
        client.email,
        accepted ? 'Bienvenido a La Comanda' : 'Usuario rechazado',
        !accepted
      );
    } catch (err) {
      console.log(err);
    }
  }
}
