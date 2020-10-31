import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { timer } from 'rxjs';
import { DBUserDocument, User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { DatabaseService } from '../../../core/Services/database.service';
const packageJson = require('../../../../../package.json');

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit, AfterViewInit {

  public author: string = packageJson.author;
  public appName: string = packageJson.name;
  public version: string = packageJson.version;
  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
  private users: User[] = [];
  public isLogin = true;
  public isSignUp = false;
  public isAnonymousLogin = false;
  @ViewChild('slider') slider: IonSlides;
  public index: number;
  private loader: HTMLIonLoadingElement;
  constructor(private creator: ComponentCreatorService, private dataBase: DatabaseService) { }

  async ngOnInit() {
    const users = await this.dataBase.getCollection<DBUserDocument>(DataBaseCollections.users).get().toPromise();
    console.log(users.docs);
    for (const user of users.docs) {
      this.users.push((user.data() as DBUserDocument).user);
    }
  }

  async ngAfterViewInit() {
    this.slider.options = {
      autoHeight: true,
      initialSlide: 1
    };
    this.index = await this.slider.getActiveIndex();
  }

  displayUserList() {
    this.creator.createColumnPicker<User>(this.pickUser.bind(this), this.users, 'users', 'email', 'md');
  }

  pickUser(user: User) {
    DataStoreService.Access.QuickUser = user;
  }

  async toLogIn() {
    DataStoreService.Various.CapturedPhotos = [];
    await this.slider.slideTo(1);
    this.index = await this.slider.getActiveIndex();
  }

  async toSignUp() {
    await this.slider.slideTo(2);
    this.index = await this.slider.getActiveIndex();
  }

  async toAnonymousLogin() {
    await this.slider.slideTo(0);
    this.index = await this.slider.getActiveIndex();
  }

  async loading(loading: boolean) {
    if (loading) {
      this.loader = await this.creator.createLoader('md', 'Cargando', true, true, 'crescent', false, 'ion-loader');
      this.loader.present();
    } else {
      await this.loader.dismiss();
      this.loader = null;
    }
  }
}
