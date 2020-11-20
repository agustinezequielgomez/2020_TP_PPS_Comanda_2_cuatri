import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'core-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent implements OnInit {
  @Input() byUrl: boolean;
  @Input() imageUrl: string;
  constructor(private route: ActivatedRoute, public location: Location) {}

  ngOnInit() {
    if (this.byUrl) {
      this.route.params.subscribe((params) => {
        this.imageUrl = params.url;
      });
    }
  }
}
