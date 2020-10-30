import { Component, Input, OnInit } from '@angular/core';
import { HomeScreenCard } from '../../Models/Classes/home-screen-card';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-screen-card',
  templateUrl: './home-screen-card.component.html',
  styleUrls: ['./home-screen-card.component.scss'],
})
export class HomeScreenCardComponent implements OnInit {

  @Input() card: HomeScreenCard;
  constructor(public nav: NavController) { }

  ngOnInit() {}

}
