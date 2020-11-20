import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'core-go-to-home-menu-button',
  templateUrl: './go-to-home-menu-button.component.html',
  styleUrls: ['./go-to-home-menu-button.component.scss'],
})
export class GoToHomeMenuButtonComponent implements OnInit {
  constructor(public nav: NavController) {}

  ngOnInit() {}
}
