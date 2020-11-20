import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataStoreService } from '../../Services/data-store.service';
import { CameraService } from '../../Services/camera.service';

@Component({
  selector: 'core-dniform-input',
  templateUrl: './dniform-input.component.html',
  styleUrls: ['./dniform-input.component.scss'],
})
export class DNIFormInputComponent implements OnInit {
  @Input() dni: number;
  @Output() dniRegistered = new EventEmitter<number>();
  constructor(public camera: CameraService) {}

  ngOnInit() {
    DataStoreService.User.ScannedUserObservable.subscribe((user) => {
      if (user !== null) {
        console.log(`DNI ${user.DNI}`);
        this.dni = user.DNI;
      }
    });
  }

  toBarCode = async () => await this.camera.scanBarCode();

  onDniChanged(dni: number) {
    this.dniRegistered.emit(dni);
    this.dni = dni;
  }
}
