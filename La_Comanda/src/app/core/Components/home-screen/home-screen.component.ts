import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../Services/data-store.service';
import { HomeScreenCards } from '../../Models/Classes/home-screen-card';
import { UserRoles } from '../../Models/Enums/user-roles.enum';
import { DatabaseService } from '../../Services/database.service';
import { DataBaseCollections } from '../../Models/Enums/data-base-collections.enum';
import { DBUserDocument } from '../../Models/Classes/user';
import { Client } from '../../Models/Classes/client';

@Component({
  selector: 'core-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  public cards: HomeScreenCards;
  constructor(private dataBase: DatabaseService) {}

  ngOnInit() {
    DataStoreService.User.CurrentUserObservable.subscribe((user) => {
      if (user !== null && user.data) {
        // HUGE WORKAROUND TO ALWAYS KEEP CLIENT UPDATED
        if (user.data.role === UserRoles.CLIENTE) {
          this.dataBase
            .getDocumentDataStream<DBUserDocument>(DataBaseCollections.users, user.UID)
            .subscribe((client) => {
              console.log(client, user);
              DataStoreService.Client.CurrentClient = client.user as Client;
              this.cards = DataStoreService.Cards.GetCards();
            });
        } else {
          this.cards = DataStoreService.Cards.GetCards();
        }
      }
    });
  }
}
