import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Alimento } from '../../Models/Classes/alimento';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-food-item',
  templateUrl: './order-food-item.component.html',
  styleUrls: ['./order-food-item.component.scss'],
})
export class OrderFoodItemComponent implements OnInit {
  @Output() removeItem = new EventEmitter<void>();
  @Output() ammountOrdered = new EventEmitter<number>();
  @Input() food: Alimento;
  public totalPrice = 0;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.totalPrice = this.food.precio;
  }

  ammountChange(ammount: number) {
    this.totalPrice = this.food.precio * ammount;
    this.ammountOrdered.emit(ammount);
  }
}
