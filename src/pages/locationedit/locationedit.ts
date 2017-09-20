import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ViewController} from 'ionic-angular';
import {LocationTracker} from "../../providers/location-tracker";
import * as firebase from "firebase/app";
import {Http, RequestOptions, Headers} from "@angular/http";

/*
  Generated class for the Locationedit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-locationedit',
  templateUrl: 'locationedit.html'
})
export class LocationeditPage {


   email1:string;
   loading:any;
   update:any;
  constructor(public navCtrl: NavController,public victrl:ViewController, public navParams: NavParams,public location:LocationTracker,public http:Http,public loadingCtrl:LoadingController) {


    this.loading = this.loadingCtrl.create({
      content:"Saving..."
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationeditPage');



  }


  updatedata() {
    console.log("updated start");
    this.loading.present();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }

    this.update = {
      lat: this.location.lat,
     lng:this.location.lng
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/profile/upload/email/location/' + this.email1, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
      this.loading.dismissAll();
      this.Dismiss();
      //this.navCtrl.push(WalletPage);
    }, err => {
      console.log("Error!:", err.json());
      this.loading.dismissAll();
    });

    this.loading.dismissAll();
    this.Dismiss();

  }



  Dismiss(){
    this.victrl.dismiss();

  }


}

