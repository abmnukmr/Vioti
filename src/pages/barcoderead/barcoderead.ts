import { Component } from '@angular/core';
import {NavController, NavParams, Loading, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase/app";
import {LaunchNavigator, LaunchNavigatorOptions, CallNumber} from 'ionic-native';


/*
  Generated class for the Barcoderead page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-barcoderead',
  templateUrl: 'barcoderead.html'
})
export class BarcodereadPage {

  showThis:boolean=false;
  wendor:any;
  name:string;
  loading: Loading;
  email:string;
  shopname:string;
  col:boolean=false;
  col1:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public abmnu:Abmnu,public loadingCtrl:LoadingController,public alertCtrl: AlertController,public connectivityService:ConnectivityService ) {


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



  load()
  {
    if(this.connectivityService.isOnline())
    {
      this.loading.present();

      this.email=this.navParams.get("email1");

      //this.email="abmnukmr@gmail.com";

      this.abmnu.getReviews(this.email).then((data) => {
        console.log(data);
        this.wendor =data;
        this.showThis=true;
        this.loading.dismissAll();
        console.log("get");
        if(this.wendor.status=="true"){
          this.col=true;
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






  nevigate(){

    //31.7104269,76.5258813
    LaunchNavigator.navigate([this.wendor.lat, this.wendor.lng], {
      // start: 'this.lati,this.lngi'
//      this.name=;

    destinationName:this.wendor.name
    });
  }


  doRefresh(refresher) {
    this.load();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  /*

   wendor=
   {
   "_id": "5898e365bcb80bc27b9269f3",
   "name":"abhimanyu Interprises",
   "address":"clifornis",
   "whatsapp":"+91 9625255416",
   "phone":"+91 9625255416",
   "email":"abmnukmr@gmail.com",
   "discription":"abhimany shop for electronics and xbee network",
   "folowers":"2",
   "status":"open",
   "item": [
   {"image":[
   {"img":"https://i.ytimg.com/vi/rFBxuK6z0DA/maxresdefault.jpg"},
   {"img":"https://i.ytimg.com/vi/ilwOlSb1bUs/maxresdefault.jpg"},
   {"img":"http://indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-8.jpg"}
   ],
   "price":"140/-",
   "discription":"my shop best item",
   "itemno":"#1"},
   {"image":[
   {"img":"http://indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-8.jpg"},
   {"img":"https://i.ytimg.com/vi/ilwOlSb1bUs/maxresdefault.jpg"},
   {"img":"https://i.ytimg.com/vi/rFBxuK6z0DA/maxresdefault.jpg"}
   ],
   "price":"140/-",
   "discription":"my shop best item",
   "itemno":"#1"}
   ]
   };

   */




}




