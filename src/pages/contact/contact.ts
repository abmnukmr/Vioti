import { Component } from '@angular/core';

import {NavController, Loading, LoadingController} from 'ionic-angular';
import * as firebase from "firebase/app";
import {Favourite} from "../../providers/favourite";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  pet: string = "puppies";

  items:any;
  loading:Loading;

  data: any;
  finalstatus:string;
  finalstatuss:string;
  email1:any;

  wendor:any;
  item_name:any;
  item_no:any;
  item_discription:any;
  icon:any;
  favi:any;
  item_price:any;
  showThis:boolean=false;
  open=false;

  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController,public _favrouite:Favourite) {



    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });
    this.load();

  }



  load() {

    this.loading.present();

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }    console.log("gjgjh");
    this._favrouite.load(this.email1).then((data) => {
      console.log(data);
      this.wendor=data;
      this.favi = JSON.stringify(this.wendor);
      //console.log(this.wendor.fav);
      this.loading.dismissAll();
      // console.log(this.items);
      //console.log("callback" + JSON.stringify(data));

    });
  }


}
