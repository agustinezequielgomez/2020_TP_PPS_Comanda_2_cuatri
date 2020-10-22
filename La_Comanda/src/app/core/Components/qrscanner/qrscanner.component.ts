import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QRScannerComponent implements OnInit {

  @Output() qrScanned = new EventEmitter<string>();
  private qrScannerSubscription: Subscription;
  constructor(private qrScanner: QRScanner) { }

  async ngOnInit() {
    await this.qrScanner.prepare();
    this.qrScannerSubscription = this.qrScanner.scan().subscribe(async (qrCode: string) => {
      this.qrScannerSubscription.unsubscribe();
      await this.qrScanner.pausePreview();
      this.qrScanned.emit(qrCode);
    });
    await this.qrScanner.show();
  }

}
