import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoToHomeMenuButtonComponent } from './go-to-home-menu-button.component';

describe('GoToHomeMenuButtonComponent', () => {
  let component: GoToHomeMenuButtonComponent;
  let fixture: ComponentFixture<GoToHomeMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoToHomeMenuButtonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GoToHomeMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
