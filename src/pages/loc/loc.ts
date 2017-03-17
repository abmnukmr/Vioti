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
  latlng: any;
  address: any;
  lati: any;
  long: any;
  lt:any;
  _fitdata:any;

  constructor(public navCtrl: NavController, public navprms: NavParams,public modalCtrl:ModalController,public _shopdata:Shopdata) {
    //this.tabBarElement=document.querySelector('#tabs ion-tabbar-section');

    this.address = this.navprms.get("address");


    this.latlng = this.navprms.get("Latlng");

       this.lt=JSON.parse (this.latlng);
    this.lati = this.lt.lat;

    this.long = this.lt.lng;
    this. load(this.lati,this.long);

  }
  showAddressModal() {
    let modal = this.modalCtrl.create(SearchlocPage,{"lat":this.lati,"lng":this.long});
    /* let  me = this;
     modal.onDidDismiss(data => {
     this.address.place = data;
     });*/
    // modal.present(modal);
    console.log("modal not working")
    modal.present();
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




}






