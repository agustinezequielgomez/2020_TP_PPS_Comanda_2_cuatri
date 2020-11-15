import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptRejectClientsComponent } from './accept-reject-clients.component';

describe('AcceptRejectClientsComponent', () => {
  let component: AcceptRejectClientsComponent;
  let fixture: ComponentFixture<AcceptRejectClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptRejectClientsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptRejectClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
