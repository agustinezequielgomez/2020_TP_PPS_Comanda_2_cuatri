import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssingTableToClientComponent } from './assing-table-to-client.component';

describe('AssingTableToClientComponent', () => {
  let component: AssingTableToClientComponent;
  let fixture: ComponentFixture<AssingTableToClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssingTableToClientComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AssingTableToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
