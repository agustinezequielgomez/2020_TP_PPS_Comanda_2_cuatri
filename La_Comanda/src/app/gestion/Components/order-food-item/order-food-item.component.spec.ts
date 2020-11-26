import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFoodItemComponent } from './order-food-item.component';

describe('OrderFoodItemComponent', () => {
  let component: OrderFoodItemComponent;
  let fixture: ComponentFixture<OrderFoodItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFoodItemComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
