import {Component, Input, NgZone} from '@angular/core';
import {
  NavController, ModalController, MenuController, Platform, Alert, AlertController,
  ToastController
} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";
import {TransitionPage} from "../transition/transition";
import {ProfilePage} from "../Profile/profile";
import {Completeservice} from "../../providers/completeservice";
import {SearchPage} from "../search/search";
import {WendorPage} from "../wendor/wendor";
import {FiterPage} from "../fiter/fiter";
import {Geolocation, GoogleMapsAnimation, GoogleMapsMarkerOptions, GoogleMapsLatLng, Geocoder, AdMob} from 'ionic-native';
import {ChooslocPage} from "../choosloc/choosloc";
import {LocPage} from "../loc/loc";
import {LocationTracker} from "../../providers/location-tracker";
import  firebase from "firebase";
import {AuthPage} from "../auth/auth";
import {Auth} from "../../providers/auth";
import { BarcodeScanner } from 'ionic-native';
import {BarcodereadPage} from "../barcoderead/barcoderead";
import {Shopdata} from "../../providers/shopdata";


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
  data:any;
  locdata:any;
  _fitdata:any;
  show2:any=false;
  lat_val:any;
  lng_val:any;


  constructor(  public authService: Auth,public alertCtrl:AlertController,public toastCtrl: ToastController,public navCtrl: NavController,public platform:Platform,public zone:NgZone, public _abmnu: Abmnu,public locationTracker: LocationTracker,public menuCtrl: MenuController,public modalCtrl: ModalController,public _shopdata:Shopdata) {





   this.load(locationTracker.lat,locationTracker.lng);

    this.showadd();







    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        if(user.emailVerified)
        {

        }
        else {
          navCtrl.setRoot(AuthPage);
          this.presentToast("Please verify your account by sent verfication link to your email");

        }



      }
      else
      {
        navCtrl.setRoot(AuthPage);
      }
    });
    //



      }



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 6000,
      position: 'top'
    });
    toast.present();
  }

scan(){

 // BarcodeScanner.scan().then((barcodeData) => {

  this.platform.ready().then(() => {
    BarcodeScanner.scan().then((result) => {

      this.data=JSON.parse(result.text);
   //   alert(this.data.shopemail);
      this.navCtrl.push(BarcodereadPage,{email1:this.data.shopemail,name:this.data.shopname,image:this.data.shopimage,catagory:this.data.shopcata });

    },err=>{

    });
  });

}












  onPageLoaded(){
    this.showadd();

    this.locationTracker.startTracking();
  }


  ionViewWillEnter() {
    /*firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

      }
      else
      {
        this.navCtrl.setRoot(AuthPage);
      }
    });
*/
    this.showadd();
   this.locationTracker.startTracking();


  }



/*  logout() {
    this.googleAuth.logout();

    console.log("addddjhjgjgj");
    this.navCtrl.pop(AuthPage);

  }*/

dologout(){
  this.authService.doLogout();
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
        this.navCtrl.setRoot(ChooslocPage);
       /* let  me = this;
        modal.onDidDismiss(data => {
        this.address.place = data;
        });*/
       // modal.present(modal);
       console.log("modal not working")


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



  goto(email){
    this.navCtrl.push(WendorPage,{"email":email});
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
                 result.subThoroughfare || "",
                 result.thoroughfare || "",
                 result.locality || "",
                 result.adminArea || "",
                 result.postalCode || "",
                 result.country ].join(" ");



          });

          }

        }
      );
    });




  }







}
