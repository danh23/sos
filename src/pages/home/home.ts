import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertPage } from "../alert/alert";
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public alertCtrl: AlertController) {

  }

  ngOnInit(){
    if (this.platform.is('android')) {
      console.log('I am an Android device!');
    }
  }

  alert(){
    this.presentAlert();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are about to alert the authorities!',
      subTitle: 'Requested service: ',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(AlertPage);
          }
        },
        {
          text: 'Dismiss',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

}
