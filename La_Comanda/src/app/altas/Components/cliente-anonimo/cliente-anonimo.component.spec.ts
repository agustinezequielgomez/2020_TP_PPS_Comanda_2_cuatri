import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteAnonimoComponent } from './cliente-anonimo.component';

describe('ClienteAnonimoComponent', () => {
  let component: ClienteAnonimoComponent;
  let fixture: ComponentFixture<ClienteAnonimoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteAnonimoComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteAnonimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
