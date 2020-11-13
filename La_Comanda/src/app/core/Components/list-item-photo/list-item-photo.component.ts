import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-item-photo',
  templateUrl: './list-item-photo.component.html',
  styleUrls: ['./list-item-photo.component.scss'],
})
export class ListItemPhotoComponent implements OnInit {
  @Input() photoUrl: string;
  @Input() title: string;
  @Input() content: string;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}

  onClickEvent() {}
}
