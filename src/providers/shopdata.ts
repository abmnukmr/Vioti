import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import {LocationTracker} from "./location-tracker";
/*
  Generated class for the Shopdata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Shopdata {
  data:any;

  _lat:any;
  _lng:any;
  constructor(public http: Http,public locationTracker: LocationTracker) {
    console.log('Hello Shopdata Provider');



    this.load(locationTracker.lat,locationTracker.lng);


  }

  load(lati,lngi)
  {

    if(this.data){
      return new Promise(resolve => {

        this.http.get('https://vioti.herokuapp.com/search/all/shop').map(res => res.json()).subscribe(data => {

          this.data = this.applyHaversine(data.location,lati,lngi);

          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });

          resolve(this.data);
        });

      });


    }

    return new Promise(resolve => {

      this.http.get('https://vioti.herokuapp.com/search/all/shop').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data.location,lati,lngi);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
      });

    });

  }

  applyHaversine(locations,lati,lngi){

    let usersLocation = {
      lat:lati,
      lng: lngi
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.lat,
        lng: location.lng,
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
    return x * Math.PI / 180;
  }

}
