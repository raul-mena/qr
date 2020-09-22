import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  isScanning = false;
  constructor(
    private qrScanner: QRScanner,
    private alertCtrl: AlertController
  ) {}

  changeValue(ev) {
    this.value = ev.detail.value;
  }

  activeQrScanner() {
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.isScanning = true;
        // camera permission was granted
        // start scanning
        this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.presentAlert(text);
          setTimeout(() => {
            this.stop(); // hide camera preview
          }, 100);
        });
        this.qrScanner.show();
      } else if (status.denied) {
        this.presentAlert('camera permission was permanently denied');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        this.presentAlert('permission was denied, but not permanently');
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  stop(){
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy(); // hide camera preview
    this.isScanning = false;
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'QR response',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
