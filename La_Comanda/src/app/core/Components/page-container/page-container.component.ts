import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'core-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
