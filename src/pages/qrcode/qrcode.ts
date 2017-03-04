import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {QRCodeComponent} from 'angular2-qrcode';
import * as firebase from "firebase/app";

/*
  Generated class for the Qrcode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
 // directives:[QRCodeComponent]

})
export class QrcodePage {


  shopname:string;
   email1:string;
  qrdata1:any;
  qrdata:any;
  shopimage:string;
  shopcata:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {


    this.shopname=this.navParams.get("shopname");
    //shopname:this.wendor.name,shopimage:this.wendor.profileimage,shopcata:this.wendor.catagory
    this.shopimage=this.navParams.get("shopimage");
    this.shopcata=this.navParams.get("shopcata");

    var qrdata={
      shopname:this.shopname,
      shopimage:this.shopimage,
      shopcata:this.shopcata
    }


    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    this.qrdata={
      shopemail:this.email1,
      shopname:this.shopname,
      shopimage:this.shopimage,
      shopcata:this.shopcata
    }
  this.qrdata1=JSON.stringify(this.qrdata)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  Dismiss(){
    this.victrl.dismiss();

  }





}
