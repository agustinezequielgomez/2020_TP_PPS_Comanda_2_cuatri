import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClientQuestion, ClientQuestionDB } from 'src/app/core/Models/Classes/client-question';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { DataStoreService } from 'src/app/core/Services/data-store.service';
import { DatabaseService } from 'src/app/core/Services/database.service';
import { NotificationService } from 'src/app/core/Services/notification.service';

@Component({
  selector: 'gestion-waiter-question',
  templateUrl: './waiter-question.component.html',
  styleUrls: ['./waiter-question.component.scss'],
})
export class WaiterQuestionComponent implements OnInit {
  public waiterName: string;
  public questionDocuments: { ID: string; questions: ClientQuestionDB }[] = null;
  constructor(
    private dataBase: DatabaseService,
    private alert: AlertController,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.waiterName = `${DataStoreService.User.CurrentUser.data.name} ${DataStoreService.User.CurrentUser.data.lastName}`;
    this.dataBase.getComplexDataStream<ClientQuestionDB>(DataBaseCollections.questions).subscribe((questions) => {
      this.questionDocuments = questions.map((x) => ({ ID: x.ID, questions: x.DATA }));
    });
  }

  async questionModal(documentId: string, questionIndex: number) {
    const alert = await this.alert.create({
      animated: true,
      backdropDismiss: false,
      header: 'Respuesta:',
      inputs: [
        {
          name: 'answer',
          type: 'text',
          id: 'answer-input',
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
          handler: (answer: { answer: string }) => this.sendAnswer(documentId, questionIndex, answer.answer),
        },
      ],
      cssClass: 'assing-table-modal',
    });
    await alert.present();
  }

  async sendAnswer(documentId: string, questionIndex: number, answer: string) {
    const documentQuestions = this.questionDocuments.find((x) => x.ID === documentId);
    documentQuestions.questions.questions[questionIndex].answer = answer;
    documentQuestions.questions.questions[questionIndex].answeredBy = this.waiterName;
    await this.dataBase.saveDocument<ClientQuestionDB>(DataBaseCollections.questions, documentId, {
      questions: documentQuestions.questions.questions,
    });
  }
}
