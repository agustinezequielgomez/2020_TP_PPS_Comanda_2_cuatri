import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation } from '@ionic/angular';
import { DataStoreService } from '../../../core/Services/data-store.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, AfterViewInit {
  @Output() destroyComponent = new EventEmitter<void>();
  @ViewChild('container') container: ElementRef;
  constructor(private router: Router) {
    // setTimeout(() => this.router.navigate(['login']), 5000);
  }

  async ngAfterViewInit() {
    AnimationService.createAnimation(
      this.container.nativeElement,
      700,
      1,
      { property: 'opacity', fromValue: 1, toValue: 0 },
      'normal',
      'ease-in-out'
    )
      .delay(4000)
      .play();
    setTimeout(() => {
      this.destroyComponent.emit();
    }, 4700);
  }

  ngOnInit() {}
}
