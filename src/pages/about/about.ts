import { Component } from '@angular/core';

import {NavController, Loading, LoadingController, AlertController, Segment} from 'ionic-angular';
import {TransitionPage} from "../transition/transition";
import {LocationTracker} from "../../providers/location-tracker";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase/app";
import {ShopopenPage} from "../shopopen/shopopen";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Favourite} from "../../providers/favourite";
import {WendorPage} from "../wendor/wendor";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items:any;
  loading:Loading;
 pet:string;

  wendor:any;
  data: any;
  finalstatus:string;
  finalstatuss:string;
  email1:any;
   segment:Segment;
  favouritedata:any;
  item_name:any;
  item_no:any;
  item_discription:any;
  icon:any;
  favi:any;
  update:any;
  item_price:any;
  showThis:boolean=false;
  open=false;
  shopopen=ShopopenPage;
  constructor(public loadingCtrl:LoadingController,public alertCtrl: AlertController,public navCtrl: NavController,public locationTracker:LocationTracker,public connectivityService:ConnectivityService,public http:Http,public _favrouite:Favourite) {


    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });

    //this.fav=[{"name":"Georgian Cl","profileimage":"https://vioti.s3.amazonaws.com/1489542709820image.jpg","catagory":"coffee shop","email":"abmnukmr@gmail.com","status":"true","id":"2017-03-17T05:04:32.926Z"}];

//    this.getReviews();

  }


  //refresh
  doRefresh(refresher) {
    this.load();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }




  ionViewDidEnter() {
    this.pet='puppies'

    this.load();
  }

  tabchange(){
    if(this.pet== 'puppies'){
      this.pet='kittens'
    }
    else {
      this.pet= 'puppies'
    }

  }


  goto(email){
    this.navCtrl.push(WendorPage,{"email":email});
  }


  showConfirm(id) {
    console.log("show confirmation");
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'this item will be remove from you list item',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletescan(id);
          }
        }
      ]
    });
    confirm.present();
  }





  deletescan(iddel){

    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }

      this.update = {
      iddel:iddel

      }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/favourite/user/scan/delete/' + this.email1, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)


    }, err => {
      console.log("Error!:", err.json());
      // this.loading.dismissAll();
    });
    this.load();

  }


  load() {
    if (this.connectivityService.isOnline()) {

      this.loading.present();

      var user = firebase.auth().currentUser;
      if (user != null) {
        var name = user.displayName;
        this.email1 = user.email;
        var photoUrl = user.photoURL;
      }
      console.log("gjgjh");
      this._favrouite.load(this.email1).then((data) => {
        console.log(data);
        this.wendor = data;

        this.favouritedata = this.wendor.fav;
        this.favi = this.wendor.scan;
        // this.favi = JSON.stringify(this.wendor);
        //console.log(this.wendor.fav);
        this.loading.dismissAll();
        // console.log(this.items);
        //console.log("callback" + JSON.stringify(data));

      });
    }
    else {
    this.loading.dismissAll();

  let alert = this.alertCtrl.create({
  title: 'Oops',
  subTitle: 'No Internet Connectivity..',
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



}
