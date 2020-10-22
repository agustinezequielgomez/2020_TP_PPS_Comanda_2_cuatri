import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {

  public passwordInputType: 'text' | 'password' = 'password';
  @Output() passwordChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  togglePasswordInput(): void {
    (this.passwordInputType === 'text') ? this.passwordInputType = 'password' : this.passwordInputType = 'text';
  }

}
