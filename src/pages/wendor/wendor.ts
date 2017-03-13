import { Component } from '@angular/core';
import {NavController, LoadingController, Loading, AlertController, ToastController, NavParams} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase";
import { Geolocation } from 'ionic-native';
import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';
import {CallNumber} from 'ionic-native';
/*
  Generated class for the Wendor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wendor',
  templateUrl: 'wendor.html'
})
export class WendorPage {
  showThis:boolean=false;
  name:string;
  wendor:any;
  loading: Loading;
  email:string;
  lati:number;
  lngi:number;
  col:boolean=false;
  col1:boolean=false;
  constructor(public navprms: NavParams,public navCtrl: NavController,public toastCtrl: ToastController, public abmnu:Abmnu,public loadingCtrl:LoadingController,public alertCtrl: AlertController,public connectivityService:ConnectivityService ) {



    Geolocation.getCurrentPosition().then((resp) => {
      this.lati= resp.coords.latitude
      this.lngi= resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });


    this.loading = this.loadingCtrl.create({
      content:"Loading..."
    });

    this.load();

  }


  call(number){
    CallNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }


  nevigate(){

    //31.7104269,76.5258813
    LaunchNavigator.navigate([this.wendor.lat, this.wendor.lng], {
     // start: 'this.lati,this.lngi'

      destinationName:this.wendor.name
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  doref(){
     this.load();
      this.presentToast("Refreshing....");
   }





  load()
  {
    if(this.connectivityService.isOnline())
    {
      this.loading.present();
        this.email =this.navprms.get("email");
    //this.email="abmnukmr@gmail.com";

    this.abmnu.getReviews(this.email).then((data) => {
        console.log(data);
        this.wendor =data;
         this.showThis=true;
       this.loading.dismissAll();
      console.log("get");
      if(this.wendor.status=="true"){
         this.col1=false;
        console.log("gettttttt");
      }
     else {
         this.col1 =true;
      }
      });

      console.log("error");
    }
    else {
      this.loading.dismissAll();

      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'No Internet Connectivity :(',
        buttons: [
          {
            text:'Try Again',
            handler:()=>{
              this.load();
            }
          }
        ]


      });
      alert.present();

    }
  }

  doRefresh(refresher) {
    this.load();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }





}




