import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  ILatLng,
  Geocoder,
  GeocoderRequest,
  GeocoderResult,
  Marker
 } from '@ionic-native/google-maps';
import { CallNumber } from "@ionic-native/call-number";
import { Camera, CameraOptions } from "@ionic-native/camera";

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {

  latitude: number = 0;
  longitude: number = 0;
  street: String = "";
  city: String = "";

  map: GoogleMap;
  mapElement: HTMLElement;

  loader: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
              private geocoder: Geocoder,
              private callNumber: CallNumber,
              private camera: Camera,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    /*this.callNumber.callNumber("0728600515", false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer')); */
      this.loader = this.loadingCtrl.create({
        content: 'Waiting for location...'
      });
   }

  ionViewWillEnter() {
    this.loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.loadMap();
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loader.dismiss();
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude

      //this.latitude += 0.00001;
      //this.longitude +=0.00001;
      console.log(this.latitude + " " + this.longitude);
      this.updateMap(this.latitude, this.longitude);
     });
    
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30,
        },
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true
        }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    console.log(this.map);
    this.map.setClickable(true);
    this.map.setMyLocationEnabled(true);

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => {
        console.log('Map is ready!');

        this.loader.dismiss();

        this.map.getMyLocation().then(location => {
          console.log(location);
        })

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.latitude,
              lng: this.longitude
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });

      

      let cameraPos: CameraPosition<ILatLng> = {
        target: {lat: this.latitude, lng: this.longitude}
      };

      let geocodeReq: GeocoderRequest = {
        position: {
          lat: this.latitude,
          lng: this.longitude
        }
      }

      this.geocoder.geocode(geocodeReq).then(res => {
        console.log(res);
        this.street = res[0].thoroughfare;
        this.city = res[0].locality;
      });

      /*setTimeout(()=>{
        console.log("move");
        this.map.animateCamera(cameraPos).then(res => console.log(res));
      }, 5000) */
  }

  updateMap(lat, lng){

    let latLng: ILatLng = {lat, lng};
    
    /*let marker = Marker({
      map: this.map,
      icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 18),
        new google.maps.Point(11, 11)),
      position: latLng
    });
    
      let content = "<h4>You are here</h4>";
      this.addInfoWindow(marker, content);*/

    let cameraPos: CameraPosition<ILatLng> = {
      target: {lat: lat, lng: lng}
    };

    this.map.moveCamera(cameraPos).then(()=>console.log("move camera"));

  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
