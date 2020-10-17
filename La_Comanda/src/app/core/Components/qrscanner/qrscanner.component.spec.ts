import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRScannerComponent } from './qrscanner.component';

describe('QRScannerComponent', () => {
  let component: QRScannerComponent;
  let fixture: ComponentFixture<QRScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRScannerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
