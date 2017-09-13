import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertPage } from "../alert/alert";
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public toastCtrl: ToastController) {

  }

  ngOnInit(){
    if (this.platform.is('android')) {
      console.log('I am an Android device!');
    }
  }

  alert(){
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'You are about to alert!',
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(() => this.navCtrl.push(AlertPage));
    toast.present();
  }

}
