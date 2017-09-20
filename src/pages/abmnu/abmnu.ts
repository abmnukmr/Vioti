import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMap, GoogleMapsMarkerOptions, CameraPosition, GoogleMapsLatLng, GoogleMapsEvent,
  GoogleMapsMarker
} from "ionic-native";

/*
  Generated class for the Abmnu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-abmnu',
  templateUrl: 'abmnu.html'
})
export class AbmnuPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.loadMap();

  }


  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map2');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 50
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: 'Ionic',
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
  }



}
