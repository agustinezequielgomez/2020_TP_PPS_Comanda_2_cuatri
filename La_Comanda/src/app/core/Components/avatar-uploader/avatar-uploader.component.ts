import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataStoreService } from '../../Services/data-store.service';
import { CameraService } from '../../Services/camera.service';

@Component({
  selector: 'core-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.scss'],
})
export class AvatarUploaderComponent implements OnInit {
  public photoString: SafeResourceUrl = null;
  constructor(public sanitizer: DomSanitizer, private camera: CameraService) {}

  ngOnInit() {
    DataStoreService.Various.CapturedPhotosObservable.subscribe((photos) => {
      if (photos.length > 0) {
        this.photoString = this.sanitizer.bypassSecurityTrustResourceUrl(photos[0].photoUrl);
      } else {
        this.photoString = null;
      }
    });
  }

  async click() {
    await this.camera.takePicture(false);
  }
}
