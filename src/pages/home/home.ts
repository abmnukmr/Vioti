import {Component, Input, NgZone, ViewChild} from '@angular/core';
import {
  NavController, ModalController, MenuController, Platform, Alert, AlertController,
  ToastController, Slides
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
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import {MorelocalPage} from "../morelocal/morelocal";
import {Adver} from "../../providers/adver";
import {Http} from "@angular/http";
import {Notification} from "../../providers/notification";
//import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


  export class HomePage {
  title:string;
  slidee:boolean=true;
  address:string;
   choosloc=ChooslocPage;
  transitionpage=TransitionPage;
  search=SearchPage;
  loc=LocPage;
  moreloc=MorelocalPage;
  profile=ProfilePage;
  wendor=WendorPage;
  data:any;
  locadd:any;
  _fitadd:any;
  locdata:any;
  spinshow:boolean=true;
  _fitdata:any;
  show2:any=false;
  lat_val:any;
  lng_val:any;
  link:any;
  jsonn:any;
  shopId:number=2;
  adId:number=3;
  saved_lat:any;
  saved_lng:any;
  @ViewChild('mySlider')mySlider:Slides;

  constructor(public http:Http, public push: Push, public authService: Auth,public alertCtrl:AlertController,public toastCtrl: ToastController,public navCtrl: NavController,public platform:Platform,public zone:NgZone, public _abmnu: Abmnu,public locationTracker: LocationTracker,public menuCtrl: MenuController,public modalCtrl: ModalController,public _shopdata:Shopdata) {

// this.setgo();
//this.setadd();
/*
    if(this.saved_lat=0){
      while(locationTracker.lat ==0&& locationTracker.lng ==0)
    {

    }
     this.storage.set(this.saved_lat,this.locationTracker.lat);
     this.storage.set(this.saved_lng,this.locationTracker.lng);
      this.load(this.storage.get(this.saved_lat),this.storage.get(this.saved_lng));
      this.getalladd(this.storage.get(this.saved_lat),this.storage.get(this.saved_lng));

    }
    else {
      this.load(this.storage.get(this.saved_lat),this.storage.get(this.saved_lng));
      this.getalladd(this.storage.get(this.saved_lat),this.storage.get(this.saved_lng));
    }

*/
   this.getpo();
   this.load(locationTracker.lat,locationTracker.lng);
  this.getalladd(locationTracker.lat,locationTracker.lng);
  this.showadd();

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        this.link=JSON.stringify(msg.payload);

        this.jsonn=JSON.parse(this.link);
         if(this.link!=null){
           this.goto(this.jsonn.email);
         }



      });







    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        if(user.emailVerified ||  new firebase.auth.GoogleAuthProvider()
        || new firebase.auth.FacebookAuthProvider())
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


  getpo(){
    this.zone.run(()=>{

      setInterval(()=>{

        if(this.locationTracker.lat==0){

        this.load(this.locationTracker.lat,this.locationTracker.lng);
        this.getalladd(this.locationTracker.lat,this.locationTracker.lng);

        }

      },1000)


    })
  }



 private presentAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Gps is detecting your location',
      //subTitle: '10% of battery remaining',
      buttons: [
        {
          text: 'ok',
          role: 'OK',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    alert.present();
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




//
  refresh(){

    this.load(this.locationTracker.lat,this.locationTracker.lng);
    this.getalladd(this.locationTracker.lat,this.locationTracker.lng);
    this.spinshow=false;
    setTimeout(() => {




      this.spinshow=true;
      console.log('Async operation has ended');
    }, 5000);



  }
///// get all advertisement



  onPageLoaded(){
    this.showadd();

    this.locationTracker.startTracking();
  }


  ionViewWillEnter() {

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

/*
  setadd(){
    this.adId=setTimeout(() =>{
      this.getalladd(this.locationTracker.lat,this.locationTracker.lng);
    },3000);

  }*/
/*
  setgo(){

      this.shopId=setTimeout(() =>{this.load(this.locationTracker.lat,this.locationTracker.lng);
       },3000);

  }
*/

  onPageDidLeave(){
  }


//// get all advertismrent

  /*
  getalladd(lat,lng){

    console.log("getting all advertisment");
    this._adver.getadd(lat, lng).then((data) => {
      console.log(data);
      this.locadd=data;
      this._fitadd=this.locdata.slice(0,20);
    });

  }
*/


  load(lat,lng) {


    console.log("gjgjh");
    this._shopdata.load(lat, lng).then((data) => {
      console.log(data);

      // console.log(this.items);
      console.log("callback" + JSON.stringify(data));
      this.locdata=data;
      this._fitdata=this.locdata.slice(0,20);
      });
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
          this.slidee=false;
          this.locadd=this.data;
          this._fitadd=this.locadd.slice(0,20);


          console.log(data);
          this.mySlider.startAutoplay();
          this.mySlider.loop=true;
          this.mySlider.autoplay=800;
          this.mySlider.pager=true;






          this.mySlider.update();
          setTimeout(() => {

            this.mySlider.startAutoplay();

          }, 700);


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

        this.locadd=this.data;
        this._fitadd=this.locadd.slice(0,20);
        console.log(data);
        this.slidee=false;



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
