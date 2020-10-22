import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataStoreService } from '../../Services/data-store.service';
import { CameraService } from '../../Services/camera.service';

@Component({
  selector: 'app-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.scss'],
})
export class AvatarUploaderComponent implements OnInit {

  public photoString: SafeResourceUrl = null;
  constructor(public sanitizer: DomSanitizer, private camera: CameraService) { }

  ngOnInit() {
    if (DataStoreService.Various.CapturedPhotos.length > 0) {
      this.photoString = this.sanitizer.bypassSecurityTrustResourceUrl(DataStoreService.Various.CapturedPhotos[0].photoUrl);
    }
  }

  async click() {
    await this.camera.takePicture(false);
  }

}
