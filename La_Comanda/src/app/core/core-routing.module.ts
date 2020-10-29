import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRScannerComponent } from './Components/qrscanner/qrscanner.component';
import { BarCodeScannerComponent } from './Components/bar-code-scanner/bar-code-scanner.component';

const routes: Routes = [
    {
        path: 'barcode',
        component: BarCodeScannerComponent
    },
    {
        path: 'qr',
        component: QRScannerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
