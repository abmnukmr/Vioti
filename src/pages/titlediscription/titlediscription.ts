import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';
import {RequestOptions, Headers, Http} from "@angular/http";
import * as firebase from "firebase/app";

/*
  Generated class for the Titlediscription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titlediscription',
  templateUrl: 'titlediscription.html'
})
export class TitlediscriptionPage {

  discription:string;
  loading:any;
  update:any;
  email1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController,public loadingCtrl:LoadingController,public http:Http)
  {

    this.discription=this.navParams.get("shopdiscription");
    this.loading = this.loadingCtrl.create({
      content:"Saving..."
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitleeditorPage');
  }




  Dismiss(){
    this.victrl.dismiss();

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
      discription: this.discription
      //item_discription: this.discription,
      //item_price: this.itemprice,
      //item_id: this.id
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/profile/email/update/dis/' + this.email1, JSON.stringify(this.update), options)
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




}
