import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Alimento } from '../../../core/Models/Classes/alimento';
import { IonSlides } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'gestion-food-menu-modal',
  templateUrl: './food-menu-modal.component.html',
  styleUrls: ['./food-menu-modal.component.scss'],
})
export class FoodMenuModalComponent implements AfterViewInit {
  @Input() food: Alimento;
  @ViewChild('slides') slider: IonSlides;

  constructor(public sanitizer: DomSanitizer) {}

  async ngAfterViewInit() {
    try {
      this.slider.options = {
        autoHeight: true,
        initialSlide: 0,
      };
    } catch (err) {
      console.log(`modal err ${JSON.stringify(err)}`);
    }
  }
}
