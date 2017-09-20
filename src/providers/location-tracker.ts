import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation,AdMob } from 'ionic-native';
import 'rxjs/add/operator/filter';
/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone) {

  }



  showaddd(){
    let options = {
      adId: 'ca-app-pub-4636392031780588/9811500955',
      adSize: 'SMART_BANNER',
      isTesting: false,
      x:10,
      y:50

    };

    AdMob.createBanner(options).then(() => {
      AdMob.showBanner(2);
    });

  }



  hideaddd(){
      AdMob.removeBanner();

  }

  startTracking() {

    // Background Tracking

    let config = {

      frequency: 500,
      desiredAccuracy: 20,
      stationaryRadius: 20,
      distanceFilter: 10,
      interval: 10,
      debug: false,

      startOnBoot:false
    };

    BackgroundGeolocation.configure((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    }, config);

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 500,
      enableHighAccuracy: true,
      startOnBoot:true
    };

    this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    });

  }

  stopTracking() {
    console.log('stopTracking');

    BackgroundGeolocation.finish();
    this.watch.unsubscribe();


  }
}
