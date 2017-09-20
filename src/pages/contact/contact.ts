import { Component } from '@angular/core';

import {NavController, Loading, LoadingController} from 'ionic-angular';
import * as firebase from "firebase/app";
import {Favourite} from "../../providers/favourite";
import {Auth} from "../../providers/auth";
import {Notification} from "../../providers/notification";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items:any;
 spinshow:boolean=false;

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
 name:string;
  open=false;
  color:any;
  noti:any;
  notice:any;
  constructor(public getnote:Notification,public navCtrl: NavController,public loadingCtrl:LoadingController,public _favrouite:Favourite,  public authService: Auth) {
    this.randomcokor();
    this.getnoteee();


    var user = firebase.auth().currentUser;
    if (user != null) {
      this.name = user.displayName;
      this.email1 = user.email;

    }

  }

  randomcokor(){
   this.color='#'+Math.floor(Math.random()*16777215).toString(16);
  }
  dologout(){
    this.authService.doLogout();
    navigator['app'].exitApp();
  }


  getnoteee(){
    this.getnote.notification().then((data)=>{
      console.log(data)
      this.spinshow=true;
       this.noti=data;
       this.notice=this.noti.notification;
       console.log(data);

    });


  }

}
