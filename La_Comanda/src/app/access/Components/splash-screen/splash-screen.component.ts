import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';

@Component({
  selector: 'access-splash-screen',
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
    console.log('splash');
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
      console.log('destroy');
      this.destroyComponent.emit();
    }, 4700);
  }

  ngOnInit() {}
}
