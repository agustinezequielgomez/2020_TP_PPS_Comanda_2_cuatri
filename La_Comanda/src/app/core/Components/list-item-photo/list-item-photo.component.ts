import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'core-list-item-photo',
  templateUrl: './list-item-photo.component.html',
  styleUrls: ['./list-item-photo.component.scss'],
})
export class ListItemPhotoComponent implements OnInit {
  @Input() photoUrl: string;
  @Input() title: string;
  @Input() content: string;
  @Input() actionItem: TemplateRef<any>;
  @Input() listValue: any;
  @Input() detail: boolean;
  @Input() lines: string = 'inlined';
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}

  onClickEvent() {}
}
