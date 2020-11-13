import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodMenuModalComponent } from './food-menu-modal.component';

describe('FoodMenuModalComponent', () => {
  let component: FoodMenuModalComponent;
  let fixture: ComponentFixture<FoodMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodMenuModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
