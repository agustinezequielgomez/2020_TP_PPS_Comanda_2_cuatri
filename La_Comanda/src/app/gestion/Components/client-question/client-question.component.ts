import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatabaseService } from '../../../core/Services/database.service';
import { ClientQuestion, ClientQuestionDB } from '../../../core/Models/Classes/client-question';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { AlertController } from '@ionic/angular';
import { NotificationService } from '../../../core/Services/notification.service';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';

@Component({
  selector: 'gestion-client-question',
  templateUrl: './client-question.component.html',
  styleUrls: ['./client-question.component.scss'],
})
export class ClientQuestionComponent implements OnInit {
  public clientQuestions: ClientQuestion[] = null;
  constructor(
    private dataBase: DatabaseService,
    private alert: AlertController,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.dataBase
      .getDocumentDataStream<ClientQuestionDB>(DataBaseCollections.questions, DataStoreService.Client.CurrentClient.UID)
      .subscribe((questions) => {
        this.clientQuestions = questions && questions.questions ? questions.questions : [];
      });
  }

  async questionModal() {
    const alert = await this.alert.create({
      animated: true,
      backdropDismiss: false,
      header: '¿Que necesitas saber?',
      inputs: [
        {
          name: 'question',
          type: 'text',
          id: 'question-input',
        },
      ],
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'assing-table-modal-close',
        },
        {
          text: 'Confirmar',
          cssClass: 'assing-table-modal-confirm',
          handler: (question: { question: string }) => this.sendQuestion(question.question),
        },
      ],
      cssClass: 'assing-table-modal',
    });
    await alert.present();
  }

  async sendQuestion(question: string) {
    const client = DataStoreService.Client.CurrentClient;
    const newQuestion: ClientQuestion = {
      askedBy: `${client.data.name} ${client.data.lastName ? client.data.lastName : ''}`,
      question,
      answer: null,
      answeredBy: null,
    };
    this.clientQuestions.push(newQuestion);
    await this.notification.sendPushNotificationToRoles(
      [UserRoles.MOZO],
      { title: 'Nueva pregunta de cliente', body: `${newQuestion.askedBy} preguntó: ${question}` },
      'waiterQuestion'
    );
    await this.dataBase.saveDocument<ClientQuestionDB>(DataBaseCollections.questions, client.UID, {
      questions: this.clientQuestions,
    });
  }
}
