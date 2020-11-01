import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from '../../../core/Services/data-store.service';
import { AuthService } from '../../../core/Services/auth.service';
import { UserRoles } from 'src/app/core/Models/Enums/user-roles.enum';
import { NotificationService } from '../../../core/Services/notification.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  public form: FormGroup;
  public enabled = false;
  @Input() isAccess: boolean;
  @Output() toLogin = new EventEmitter<void>();
  constructor(private pipe: TitleCasePipe, private auth: AuthService, private notification: NotificationService,
              private creator: ComponentCreatorService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.form.valueChanges.subscribe(() => this.enabled = (DataStoreService.Various.CapturedPhotos.length > 0 && this.form.valid));
    DataStoreService.Various.CapturedPhotosObservable.subscribe(photos => this.enabled = (photos.length > 0 && this.form.valid));
    DataStoreService.User.ScannedUserObservable.subscribe((user) => {
      if (user !== null) {
        this.form.get('name').setValue(this.pipe.transform(user.name));
        this.form.get('lastName').setValue(this.pipe.transform(user.lastName));
        console.log(user.DNI);
        this.form.get('dni').setValue(user.DNI);
      }
    });
  }

  async signUp() {
    const loader = await this.creator.createLoader('md', 'Registrando cliente', true, true, 'crescent', false, 'ion-loader');
    loader.present();
    const success: boolean = await this.auth.signUp({ email: this.form.get('email').value,
                      name: this.form.get('name').value,
                      password: this.form.get('password').value,
                      lastName: this.form.get('lastName').value,
                      DNI: this.form.get('dni').value,
                      role: UserRoles.CLIENTE });
    if (success) {
      this.form.reset();
      await this.notification.presentToast('success', '¡Registro realizado con éxito! Su usuario deberá ser aprobado por uno de nuestros supervisores para poder operar nuestros servicios', 15000, 'md', 'bottom');
    }
    DataStoreService.Various.CapturedPhotos = [];
    await loader.dismiss();
    this.form.reset( { name: '', lastName: '', password: '', dni: null, email: '' });
    this.toLogin.emit();
  }
}
