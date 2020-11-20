import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoIntoWaitingListComponent } from './go-into-waiting-list.component';

describe('GoIntoWaitingListComponent', () => {
  let component: GoIntoWaitingListComponent;
  let fixture: ComponentFixture<GoIntoWaitingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoIntoWaitingListComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GoIntoWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
