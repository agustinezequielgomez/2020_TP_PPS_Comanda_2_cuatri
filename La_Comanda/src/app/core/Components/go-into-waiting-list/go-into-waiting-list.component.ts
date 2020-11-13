import { Component, OnInit } from '@angular/core';
import { Mesas } from '../../Models/Classes/mesa';
import { DataBaseCollections } from '../../Models/Enums/data-base-collections.enum';
import { CameraService } from '../../Services/camera.service';
import { DatabaseService } from '../../Services/database.service';
import { DataStoreService } from '../../Services/data-store.service';
import { Client, ClientState } from 'src/app/core/Models/Classes/client';
import { NavController } from '@ionic/angular';
import { NotificationService } from '../../Services/notification.service';
import { UserRoles } from '../../Models/Enums/user-roles.enum';
import { DBUserDocument } from '../../Models/Classes/user';
import { Plugins } from '@capacitor/core';
const { Haptics } = Plugins;
@Component({
  selector: 'app-go-into-waiting-list',
  templateUrl: './go-into-waiting-list.component.html',
  styleUrls: ['./go-into-waiting-list.component.scss'],
})
export class GoIntoWaitingListComponent implements OnInit {
  private waitingListQR = 'JphpxNNNZJN5S9KzyCMAAnYwJWVuuk';
  public success: boolean = null;
  public message: string;
  constructor(
    private camera: CameraService,
    private dataBase: DatabaseService,
    public nav: NavController,
    private notification: NotificationService
  ) {}

  async ngOnInit() {
    try {
      const qrCode = await this.camera.scanQrCode();
      if (qrCode === this.waitingListQR) {
        this.dataBase.saveDocument<Client>(
          DataBaseCollections.waiting_list,
          DataStoreService.Client.CurrentClient.UID,
          DataStoreService.Client.CurrentClient
        );
        DataStoreService.Client.CurrentClient.state = ClientState.EN_LISTA_DE_ESPERA;
        await this.dataBase.saveDocument<DBUserDocument>(
          DataBaseCollections.users,
          DataStoreService.Client.CurrentClient.UID,
          { user: DataStoreService.Client.CurrentClient }
        );
        this.notification.sendPushNotificationToRoles(
          [UserRoles.METRE],
          { title: 'Nuevo cliente en lista de espera', body: 'Hay un nuevo cliente esperando para ser atendido' },
          'assingTable'
        );
        this.success = true;
        this.message = '¡Ingreso a la lista de espera con éxito! En breve el metre va a asignarte a una mesa';
      } else if (
        (await this.dataBase.queryCollection<Mesas>(DataBaseCollections.mesas, (x) => x.where('qr', '==', qrCode)))
          .length > 0
      ) {
        this.success = false;
        this.message = 'Lo sentimos, pero no podes ingresar a la mesa sin pasar por la lista de espera';
        Haptics.vibrate();
      } else {
        this.success = false;
        this.message = 'Lo sentimos, pero no podemos reconocer ese código QR';
        Haptics.vibrate();
      }
    } catch (err) {
      this.success = false;
      this.message = 'Lo sentimos, pero no podemos reconocer ese código QR';
      Haptics.vibrate();
    }
  }
}
