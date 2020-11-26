import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesaComponent } from './mesa.component';

describe('MesaComponent', () => {
  let component: MesaComponent;
  let fixture: ComponentFixture<MesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
