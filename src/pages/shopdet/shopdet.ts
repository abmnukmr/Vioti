import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";
import * as firebase from "firebase/app";
import {Auth} from "../../providers/auth";

/*
  Generated class for the Shopdet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopdet',
  templateUrl: 'shopdet.html'
})
export class ShopdetPage {
  email1:any;
  butn:boolean=true;
  spinshow:boolean=true;
  constructor(public navCtrl: NavController, public navParams:NavParams,public http:Http,public alertCtrl: AlertController, public authService: Auth) {

    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopdetPage');
  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Your shop will be deleted permanently. And your app will be closed and you will be logged out for upadting data and security purpose.',
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
            this.deleteshop();
           }
        }
      ]
    });
    confirm.present();
  }


    deleteshop(){
    this.butn=false;
     this.spinshow=false;
    this.http.get('https://vioti.herokuapp.com/delete/shop/'+this.email1).subscribe((res) => {
      console.log(res.json());
    });
      setTimeout(() => {
        console.log('Async operation has ended');
        this.authService.doLogout();
        navigator['app'].exitApp();
      }, 7000);


    }


}
