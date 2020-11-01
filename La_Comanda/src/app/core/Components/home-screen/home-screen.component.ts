import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../Services/data-store.service';
import { HomeScreenCards } from '../../Models/Classes/home-screen-card';
import { UserRoles } from '../../Models/Enums/user-roles.enum';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {

  public cards: HomeScreenCards;
  constructor() { }

  ngOnInit() {
    DataStoreService.User.CurrentUserObservable.subscribe(user => {
      if (user !== null && user.data) {
        this.cards = DataStoreService.Cards.GetCards();
      }
    });
  }

}
