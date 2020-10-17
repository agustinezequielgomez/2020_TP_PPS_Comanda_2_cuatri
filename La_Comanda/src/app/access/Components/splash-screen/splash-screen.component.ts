import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, AfterViewInit {

  @Output() destroyComponent = new EventEmitter<void>();
  constructor(private router: Router) {
    setTimeout(() => this.router.navigate(['login']), 5000);
   }

   async ngAfterViewInit() {
    await AnimationService.playChainedAnimations();
    this.destroyComponent.emit();
  }


  ngOnInit() {}

}
