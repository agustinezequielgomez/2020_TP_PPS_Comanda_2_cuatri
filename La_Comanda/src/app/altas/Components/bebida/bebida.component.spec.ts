import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BebidaComponent } from './bebida.component';

describe('BebidaComponent', () => {
  let component: BebidaComponent;
  let fixture: ComponentFixture<BebidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BebidaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
