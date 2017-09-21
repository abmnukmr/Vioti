import { Component } from '@angular/core';
import {
  NavController, LoadingController, Loading, AlertController, ToastController, NavParams,
  ModalController
} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase";
import { Geolocation,AdMob } from 'ionic-native';
import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';
import {CallNumber} from 'ionic-native';
import {RequestOptions, Headers, Http} from "@angular/http";
import {LocationTracker} from "../../providers/location-tracker";
import {ChatbotPagePage} from "../chatbot/chatbot";
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
  emailsearch:string;
  loading: Loading;
  email:string;
  len:any;
  spinshow:boolean=false;
  emailo:string;
  liked:boolean;
  lati:number;
  lngi:number;
  num:number;
  update:any;
  count:any;
  email1:string;
  fav:string;
  col:boolean=false;
  col1:boolean=false;
  admobId:any;
  searching:boolean=false;
  constructor(public modalCtrl: ModalController, public navprms: NavParams,public locationTracker:LocationTracker,public http:Http, public navCtrl: NavController,public toastCtrl: ToastController, public abmnu:Abmnu,public loadingCtrl:LoadingController,public alertCtrl: AlertController,public connectivityService:ConnectivityService ) {



    this.spinshow=false;

    Geolocation.getCurrentPosition().then((resp) => {
      this.lati= resp.coords.latitude
      this.lngi= resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });



    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });


    this.load();


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


    this.spinshow=false;
    this.loading.present();
    if(this.connectivityService.isOnline())
    {

      this.email =this.navprms.get("email");
    //this.email="abmnukmr@gmail.com";
      var user = firebase.auth().currentUser;
      if (user != null) {
        var  name = user.displayName;
        this.emailsearch = user.email;
        var  photoUrl = user.photoURL;
      }


      this.abmnu.getReviews(this.email).then((data) => {
        console.log(data);
        this.wendor =data;

         this.showThis=true;
          this.spinshow=true;
           this.loading.dismissAll();

        this.len=this.wendor.fav.length;
        var i;
        for(i=0; i<this.len; i++){

          if(this.wendor.fav[i].email==this.emailsearch){
            this.liked=true;
           }


        }
        if(this.liked==true){
          this.fav='heart';
        }
        else {
          this.fav='ios-heart-outline';
        }

      if(this.wendor.status=="true"){
         this.col1=false;
        console.log("gettttttt");
      }
     else {
         this.col1 =true;
      }
      });

      console.log("error");
      this.spinshow=true;

    }
    else {
      this.spinshow=true;
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



    likefav (){

    if(this.fav=='heart'){

    this.unlikeshop();


    }

    else {

      this.likeashop();

    }



    }


   likeashop(){
     this.fav='heart'
     this.len=this.len+1;
   //  this.presentToast("Saving your request");

     //this.loading.present();
       var user = firebase.auth().currentUser;
       if (user != null) {
         this.email1 = user.email;

       }
     this.emailo=this.wendor.email,
       this.update = {
         email:this.wendor.email,
         useremail:this.email1,
         name:this.wendor.name,
         profileimage:this.wendor.profileimage,
         catagory:this.wendor.catagory,
         status:this.wendor.status

       }
       console.log("updated start");
       var headers = new Headers();
       headers.append('content-type', 'application/json;charset=UTF-8');
       headers.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({headers: headers});

       this.http.post('https://vioti.herokuapp.com/profile/like/shop/' + this.emailo, JSON.stringify(this.update), options)
         .map(res => res.json()).subscribe(data => {
         console.log(data)
      console.log("liking");

        // this.Dismiss();
         //this.navCtrl.push(WalletPage);
       }, err => {
         console.log("Error!:", err.json());
        // this.loading.dismissAll();
       });






   }

   unlikeshop(){

     this.fav='ios-heart-outline'
     this.len=this.len-1;
     //  this.presentToast("Saving your request");
    // this.loading.present();
     var user = firebase.auth().currentUser;
     if (user != null) {
       this.email1 = user.email;

     }
     this.emailo=this.wendor.email,
       this.update = {
         useremail:this.email1,

       }
     console.log("updated start");
     var headers = new Headers();
     headers.append('content-type', 'application/json;charset=UTF-8');
     headers.append('Access-Control-Allow-Origin', '*');
     let options = new RequestOptions({headers: headers});

     this.http.post('https://vioti.herokuapp.com/profile/dislike/shop/' + this.emailo, JSON.stringify(this.update), options)
       .map(res => res.json()).subscribe(data => {
       console.log(data)
     }, err => {
       console.log("Error!:", err.json());

     });




   }




   gotochat(){

    let mdl= this.modalCtrl.create(ChatbotPagePage,{"name":this.wendor.name, "email":this.wendor.email, "profilimg":this.wendor.profileimage});
   mdl.present()


   }






}




