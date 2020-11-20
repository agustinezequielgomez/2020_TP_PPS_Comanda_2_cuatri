import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'core-list-item-skeleton',
  templateUrl: './list-item-skeleton.component.html',
  styleUrls: ['./list-item-skeleton.component.scss'],
})
export class ListItemSkeletonComponent implements OnInit {
  @Input() singleItem: boolean;
  public dummyArray = Array(15);
  constructor() {}

  ngOnInit() {}
}
