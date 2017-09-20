import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {
  GoogleMapsMarker, GoogleMapsMarkerOptions, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
  CameraPosition, Geocoder
} from "ionic-native";
import {map} from "rxjs/operator/map";
import {SearchlocPage} from "../searchloc/searchloc";
import {Shopdata} from "../../providers/shopdata";
import {WendorPage} from "../wendor/wendor";
import {MorecurPage} from "../morecur/morecur";
import {Http} from "@angular/http";

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
   latlng: any;
  address: any;
  lati: any;
  slidee:boolean=true;
  long: any;
   locadd:any;
   _fitadd:any;
   data:any;
  lt:any;
  loccur=MorecurPage;
  _fitdata:any;

  constructor(public http:Http,public navCtrl: NavController, public navprms: NavParams,public modalCtrl:ModalController,public _shopdata:Shopdata) {
    //this.tabBarElement=document.querySelector('#tabs ion-tabbar-section');

    this.address = this.navprms.get("address");


    this.latlng = this.navprms.get("Latlng");

       this.lt=JSON.parse (this.latlng);
    this.lati = this.lt.lat;

    this.long = this.lt.lng;
    this. load(this.lati,this.long);
    this.getalladd(this.lati,this.long);


  }
  showAddressModal() {
    let modal = this.modalCtrl.create(SearchlocPage,{"lat":this.lati,"lng":this.long});
    /* let  me = this;
     modal.onDidDismiss(data => {
     this.address.place = data;
     });*/
    // modal.present(modal);
    console.log("modal not working");
    modal.present();
  }


  gotomore(){
    this.navCtrl.push(MorecurPage,{"lat":this.lati,"lng":this.long});
  }

  load(lat,lng) {


    console.log("gjgjh");
    this._shopdata.load(lat, lng).then((data) => {
      console.log(data);
      // console.log(this.items);
      console.log("callback" + JSON.stringify(data));
      this._fitdata=data;
      return this._fitdata;
    });



  }

  goto(email){
    this.navCtrl.push(WendorPage,{"email":email});
  }



  getalladd(lati,lngi)
  {

    if(this.data) {

      return new Promise(resolve => {

        this.http.get('https://vioti.herokuapp.com/addver/all').map(res => res.json()).subscribe(data => {

          this.data = this.applyHaversine(data.adv,lati,lngi);

          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });

          resolve(this.data);

          this.locadd=this.data;
          this.slidee=false;
          this._fitadd=this.locadd.slice(0,20);


          console.log(data);



        });

      });
    }

    return new Promise(resolve => {

      this.http.get('https://vioti.herokuapp.com/addver/all').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data.adv,lati,lngi);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
        this.slidee=false;
        this.locadd=this.data;
        this._fitadd=this.locadd.slice(0,20);



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






