import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataStoreService } from '../../Services/data-store.service';

@Component({
  selector: 'core-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  public passwordInputType: 'text' | 'password' = 'password';
  @Input() password = '';
  @Input() login: boolean;
  @Output() passwordChange = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
    if (this.login) {
      DataStoreService.Access.QuickUserSelectedObservable.subscribe((user) => {
        if (user !== null) {
          this.password = user.password;
        }
      });
    }
  }

  togglePasswordInput(): void {
    this.passwordInputType === 'text' ? (this.passwordInputType = 'password') : (this.passwordInputType = 'text');
  }

  onPasswordChange(password: string) {
    this.password = password;
    this.passwordChange.emit(password);
  }
}
