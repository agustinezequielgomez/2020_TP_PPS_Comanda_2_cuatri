import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarUploaderComponent } from './avatar-uploader.component';

describe('AvatarUploaderComponent', () => {
  let component: AvatarUploaderComponent;
  let fixture: ComponentFixture<AvatarUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarUploaderComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
