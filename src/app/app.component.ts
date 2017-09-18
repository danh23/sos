import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Diagnostic } from "@ionic-native/diagnostic";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private diagnostic: Diagnostic) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.diagnostic.isLocationEnabled().then(res=>{
        console.log("location available: ", res);
        if(res !== true) {
          this.diagnostic.switchToLocationSettings();
        }  
        this.diagnostic.isLocationAuthorized().then(res=>{
          console.log("location authorized: ", res);
          if(res !== true) {
            this.diagnostic.requestLocationAuthorization("always").then(res=> console.log(res));
          }
        })
      })
      
    });
  }
}

