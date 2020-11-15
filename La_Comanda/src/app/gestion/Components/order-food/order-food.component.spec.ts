import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFoodComponent } from './order-food.component';

describe('OrderFoodComponent', () => {
  let component: OrderFoodComponent;
  let fixture: ComponentFixture<OrderFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFoodComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
