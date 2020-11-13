import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../Models/Classes/alimento';
import { DataBaseCollections } from '../../Models/Enums/data-base-collections.enum';
import { DatabaseService } from '../../Services/database.service';
import { ComponentCreatorService } from '../../Services/component-creator.service';
import { FoodMenuModalComponent } from '../food-menu-modal/food-menu-modal.component';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
})
export class FoodMenuComponent implements OnInit {
  public foods: Alimento[] = null;
  public dummyArray: Array<any> = Array(15);
  constructor(private dataBase: DatabaseService, private creator: ComponentCreatorService) {}

  async ngOnInit() {
    const foods = await this.dataBase.getCollectionData<Alimento>(DataBaseCollections.comidas);
    const drinks = await this.dataBase.getCollectionData<Alimento>(DataBaseCollections.bebidas);
    this.foods = [];
    this.foods.push(...foods, ...drinks);
  }

  async openModal(food: Alimento) {
    try {
      await this.creator.createModal<void>('md', FoodMenuModalComponent, { food }, true, true, 'food-modal');
    } catch (err) {
      console.log(`modal err ${JSON.stringify(err)}`);
    }
  }
}
