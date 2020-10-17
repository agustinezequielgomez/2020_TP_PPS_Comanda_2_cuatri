import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './Components/login-screen/login-screen.component';
import { QRScannerComponent } from '../core/Components/qrscanner/qrscanner.component';

const routes: Routes = [
    {
        path: '',
        component: LoginScreenComponent,
        data: {state: 'loginScreen'}
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessRoutingModule { }
