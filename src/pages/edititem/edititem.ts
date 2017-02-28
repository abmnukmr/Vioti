import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import  firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";

/*
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html'
})
export class EdititemPage {

  itemname:any;
  itemnumber:number;
  discription:any;
  itemprice:any;
  id:any;
  email1:any;
  update:any;
  loading:any;
  constructor(public navCtrl: NavController, public navprms: NavParams,public http:Http,public loadingCtrl:LoadingController) {


    this.itemname = this.navprms.get("item_name");
    this.itemnumber = this.navprms.get("item_no");
    this.discription = this.navprms.get("item_discription");
    this.itemprice = this.navprms.get("item_price");
    this.id = this.navprms.get("_id");

   this.update={
     item_name:this.itemname,
     item_number:this.itemnumber,
     item_discription:this.discription,
     item_price:this.itemprice,
     item_id:this.id
   }

    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }




  updatedata(){
    this.loading.present();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('https://vioti.herokuapp.com/profile/email/update/item/'+this.email1, JSON.stringify(this.update), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
          this.loading.dismissAll();
          this.navCtrl.push(WalletPage);
      },
      err=>{



      }


      );

  }

}
