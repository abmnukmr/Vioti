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
  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {


    this.shopname=this.navParams.get("shopname");


    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  Dismiss(){
    this.victrl.dismiss();

  }





}
