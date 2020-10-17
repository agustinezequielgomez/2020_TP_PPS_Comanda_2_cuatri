import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QRScannerComponent implements OnInit {

  private qrScannerSubscription: Subscription;
  constructor(private qrScanner: QRScanner) { }

  async ngOnInit() {
    await this.qrScanner.prepare();
    this.qrScannerSubscription = this.qrScanner.scan().subscribe(async (qrCode: string) => {
      // DO SOMETHING WITH THE QR CODE
      this.qrScannerSubscription.unsubscribe();
      await this.qrScanner.pausePreview();

    });
    await this.qrScanner.show();
  }

}
