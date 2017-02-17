import {Component, Input, NgZone} from '@angular/core';
import {NavController, ModalController, MenuController, Platform} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";
import {TransitionPage} from "../transition/transition";
import {ProfilePage} from "../Profile/profile";
import {Completeservice} from "../../providers/completeservice";
import {SearchPage} from "../search/search";
import {WendorPage} from "../wendor/wendor";
import {FiterPage} from "../fiter/fiter";
import {Geolocation, GoogleMapsAnimation, GoogleMapsMarkerOptions, GoogleMapsLatLng, Geocoder} from 'ionic-native';
import {ChooslocPage} from "../choosloc/choosloc";
import {LocPage} from "../loc/loc";
import {LocationTracker} from "../../providers/location-tracker";
import {location} from "@angular/platform-browser/src/facade/browser";
import  firebase from "firebase";
import {AuthPage} from "../auth/auth";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 // directives : [AUTOCOMPLETE_DIRECTIVES],
 // providers:[Completeservice]

    })


  export class HomePage {
  title:string;
  address:string;
   choosloc=ChooslocPage;
  transitionpage=TransitionPage;
  search=SearchPage;
  loc=LocPage;
  profile=ProfilePage;
  wendor=WendorPage;
  show2:any=false;


  constructor(public navCtrl: NavController,public platform:Platform,public zone:NgZone, public _abmnu: Abmnu,public locationTracker: LocationTracker,public menuCtrl: MenuController,public modalCtrl: ModalController) {


    this.showadd();

  }





  onPageLoaded(){
    this.showadd();

    this.locationTracker.startTracking();
  }


  ionViewWillEnter() {
      this.showadd();
   this.locationTracker.startTracking();


  }




  showAddressModal() {
   let modal = this.modalCtrl.create(SearchPage);
    /* let  me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });*/
   // modal.present(modal);
    console.log("modal not working")
   modal.present();
     }

     showmap(){
       let modal = this.modalCtrl.create(ChooslocPage);
       /* let  me = this;
        modal.onDidDismiss(data => {
        this.address.place = data;
        });*/
       // modal.present(modal);
       console.log("modal not working")
       modal.present();


     }

  showFilter() {
    let modal = this.modalCtrl.create(FiterPage);
    /* let  me = this;
     modal.onDidDismiss(data => {
     this.address.place = data;
     });*/
    // modal.present(modal);
    console.log("modal not working")
    modal.present();
  }
  openMenu() {
    this.menuCtrl.open();
  }




  showadd( ){


  let location = new GoogleMapsLatLng(this.locationTracker.lat,this.locationTracker.lng);


    var request = {
      position: location,
      componentRestrictions: {
        country: 'IN'
      }
    }
  //  let location = new GoogleMapsLatLng(28.5272181,77.0688997);

    this.platform.ready().then(() => {

      Geocoder.geocode(request).then(
        (res) => {
          if (res.length) {
            this.zone.run(() => {
              var result = res[0];
              var position = result.position;
             // var addresss="fatuha"

               this.address = [
                 result.postalCode || "",
                result.country ].join(" ");



          });

          }

        }
      );
    });




  }







}
