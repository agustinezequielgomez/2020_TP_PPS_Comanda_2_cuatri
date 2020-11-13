import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QRScannerComponent implements OnInit {
  @Output() qrScanned = new EventEmitter<string>();
  private qrScannerSubscription: Subscription;
  constructor(private qrScanner: BarcodeScanner) {}

  async ngOnInit() {
    const qr = (
      await this.qrScanner.scan({
        formats: 'QR_CODE',
        showFlipCameraButton: true,
        prompt: 'Por favor, situa el código QR en el centro de la pantalla.',
        resultDisplayDuration: 0,
      })
    ).text;
    this.qrScanned.emit(qr);
  }
}
