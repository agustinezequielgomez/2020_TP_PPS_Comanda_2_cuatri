import { Component, OnInit } from '@angular/core';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { TestUser } from '../../../core/Models/Classes/test-user';
const packageJson = require('../../../../../package.json');

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {

  public author: string = packageJson.author;
  public appName: string = packageJson.name;
  public version: string = packageJson.version;
  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
  constructor(private creator: ComponentCreatorService) { }

  ngOnInit() {}

  displayUserList() {
    this.creator.createColumnPicker<TestUser>(this.pickUser.bind(this), DataStoreService.Access.TestUsers, 'users', 'correo', 'md');
  }

  pickUser(user: TestUser) {
    DataStoreService.Access.TestUser = user;
  }
}
