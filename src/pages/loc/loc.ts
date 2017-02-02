import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {
  GoogleMapsMarker, GoogleMapsMarkerOptions, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
  CameraPosition, Geocoder
} from "ionic-native";
import {map} from "rxjs/operator/map";

/*
  Generated class for the Loc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loc',
  templateUrl: 'loc.html'

})
export class LocPage {
  // latlng:any;
  //address:any;

  constructor(public navCtrl: NavController, public navprms: NavParams) {
    //this.tabBarElement=document.querySelector('#tabs ion-tabbar-section');
  }

  latlng: any = this.navprms.get("Latlng");

  address: any = this.navprms.get("address");


}
