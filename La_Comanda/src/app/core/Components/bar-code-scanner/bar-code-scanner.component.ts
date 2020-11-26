import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AnimationService } from '../../Services/animation.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { DataStoreService } from '../../Services/data-store.service';
import { NavController } from '@ionic/angular';
import { ScannedUser } from '../../Models/Classes/user';
import { timer } from 'rxjs';

@Component({
  selector: 'core-bar-code-scanner',
  templateUrl: './bar-code-scanner.component.html',
  styleUrls: ['./bar-code-scanner.component.scss'],
})
export class BarCodeScannerComponent implements OnInit {
  @Output() userScanned = new EventEmitter<ScannedUser>();
  @ViewChild('scanBar') scanBar: ElementRef;
  constructor(private scanner: BarcodeScanner, private nav: NavController) {}

  async ngOnInit() {
    const data = (
      await this.scanner.scan({
        formats: 'PDF_417',
        showFlipCameraButton: true,
        prompt: 'Por favor, situa el código del DNI en el centro de la pantalla.',
        resultDisplayDuration: 0,
      })
    ).text.split('@');
    let scannedUser: ScannedUser;
    if (data.length === 17) {
      DataStoreService.User.ScannedUser = scannedUser = {
        DNI: parseInt(data[1], 10),
        name: data[5],
        lastName: data[4],
      };
    } else {
      DataStoreService.User.ScannedUser = scannedUser = {
        DNI: parseInt(data[4], 10),
        name: data[2],
        lastName: data[1],
      };
    }
    this.userScanned.emit(scannedUser);
    timer(700).subscribe(() => this.nav.back({ animated: true }));
  }
}
