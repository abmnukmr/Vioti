import {Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import {NavController, ViewController, Platform} from 'ionic-angular';
import {
  CameraPosition,Geolocation, GoogleMapsLatLng, GoogleMapsEvent, GoogleMap, GoogleMapsMarkerOptions,
  GoogleMapsMarker, Geocoder
} from "ionic-native";
import {Keyboard} from "ionic-native"
import {map} from "rxjs/operator/map";
import MapTypeId = google.maps.MapTypeId;
import ControlPosition = google.maps.ControlPosition;
import {HomePage} from "../home/home";
import {LocPage} from "../loc/loc";
import {ProfilePage} from "../Profile/profile";
import {LocationTracker} from "../../providers/location-tracker";
/*
  Generated class for the Choosloc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choosloc',
  templateUrl: 'choosloc.html'
})
export class ChooslocPage {
  map5: GoogleMap;
  marker1:any;
  ltlng:any;
  tabBarElement: any;
  listshow:boolean=true;
  autocompleteItems;
  autocomplete;
  marker: GoogleMapsMarker;
  item:any;
  show:boolean=true;
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController,  public victrl: ViewController,public platform: Platform,private zone: NgZone, public location:LocationTracker) {
    platform.ready().then(() => {


      this.loadMap();
         });

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }




  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'IN'} }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  dismiss4() {
    this.victrl.dismiss();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.loadMap();

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
   // this.navCtrl.pop();
  }


  chooseItem(item: any) {
    this.autocomplete.query=item;
    this.autocompleteItems = []
    this.showadd(  this.autocomplete.query);
    Keyboard.close();

    let markerOptions: GoogleMapsMarkerOptions = {
          };

    this.map5.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
         if(marker !=null){
           this.map5.clear();
         }
        marker.showInfoWindow();


      });
  }



  loadMap(){



    let location = new GoogleMapsLatLng(28.5272181,77.0688997);

    this.map5 = new GoogleMap('map2', {
      'backgroundColor': 'white',

      'controls': {
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom':true

        },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 5,
        'bearing': 50
      }
    });
   this.map5.setPadding( 150,0,0,0 );

     this.map5.setMyLocationEnabled(true);
     this.map5.setCompassEnabled(true);
    this.map5.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });


  }



  showloc(){
      let position=  new GoogleMapsLatLng(this.location.lat,this.location.lng);
    this.map5.moveCamera(position);
    this.map5.animateCamera({
      'target': position,
      'zoom': 18
    });

    console.log("show laoction");

  }


  maptype(){

    this.map5.setMapTypeId("SATELLITE");

  }




  goBack(){
    this.navCtrl.pop();
  }

  showadd(item){


   this.platform.ready().then(() => {

    Geocoder.geocode({ 'address': item}).then(
      (res) => {
        if (res.length) {
          var result = res[0];
          var position = result.position;
          var ltlng=  JSON.stringify(result.position);
          this.map5.moveCamera(position);
          this.map5.animateCamera({
            'target': position,
            'zoom': 18
          });

          let markerOptions: GoogleMapsMarkerOptions = {
            position: position,
            title: item
          };
            if(this.marker!=null){
              this.map5.clear();
          }


          else {
              this.map5.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {

              marker.showInfoWindow();
              marker.setPosition(position);


            });
            }

        }


      }
    );
   });







  }




  save(){
    this.navCtrl.push(LocPage,{address:  this.autocomplete.query,Latlng:this.ltlng});

     }




}
