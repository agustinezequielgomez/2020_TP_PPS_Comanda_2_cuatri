import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DNIFormInputComponent } from './dniform-input.component';

describe('DNIFormInputComponent', () => {
  let component: DNIFormInputComponent;
  let fixture: ComponentFixture<DNIFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DNIFormInputComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DNIFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
