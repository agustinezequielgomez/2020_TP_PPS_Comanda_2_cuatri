import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/Classes/user';
import { DataStoreService } from '../../Services/data-store.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user: User = null;
  public profilePicture: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    DataStoreService.SideMenu.DisplayMenuObservable.subscribe(() => {
      DataStoreService.User.CurrentUserObservable.subscribe((user) => {
        if (user) {
          this.user = user;
          this.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(user.photoUrl);
          console.log(this.profilePicture);
        }
      });
    });
  }
}
