import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-photo',
  templateUrl: './list-item-photo.component.html',
  styleUrls: ['./list-item-photo.component.scss'],
})
export class ListItemPhotoComponent implements OnInit {

  @Input() photoUrl: string;
  @Input() title: string;
  @Input() content: string;
  constructor() { }

  ngOnInit() {}

  onClickEvent() { }
}
