import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    QRScanner
  ]
})
export class HomePageModule {}
