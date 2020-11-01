import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss'],
})
export class SideMenuItemComponent implements OnInit {

  @Input() id: number;
  @Input() label: string;
  @Input() href: string;
  @Input() icon: string;
  @Input() selected = false;
  @Output() clicked = new EventEmitter<void>();
  constructor(private nav: NavController) { }

  ngOnInit() { }

  clickHandler() {
    this.nav.navigateRoot(this.href, {animationDirection: 'forward'});
    this.clicked.emit();
  }

}
