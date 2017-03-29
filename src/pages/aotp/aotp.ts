import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {AphoneverPage} from "../aphonever/aphonever";
import {Favourite} from "../../providers/favourite";
import * as firebase from "firebase/app";

/*
  Generated class for the Aotp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aotp',
  templateUrl: 'aotp.html'
})
export class AotpPage {

  phone:any;
  userdata:any;
  otp:any;
  ottp:any;
  show:boolean=false;
  email1:any;
  spinshow:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _favrouite:Favourite,public toastCtrl: ToastController) {
    this.phone=this.navParams.get("phone");

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    //this.getuser(this.email1);
  }

  ionViewWillEnter()
  {


    this.getuser(this.email1);

    console.log('ionViewDidLoad OtpPage');

  }
  getuser(id){

    this._favrouite.load(this.email1).then((data) => {
      console.log(data);
      this.spinshow=true;
      this.show=true;
      this.userdata =data;
      this.otp=(this.userdata.otp);

      console.log("callback"+JSON.stringify(data));
// console.log(this.items);
      //console.log("callback" + JSON.stringify(data));

    });

  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



  goto(){
    console.log(this.otp);
    console.log(this.ottp);

    if(this.otp ==this.ottp){
      this.navCtrl.setRoot(TitlecontactPage,{"phone":this.phone});
    }
    else {
      this.presentToast("Invalid OTP");
    }
  }

  senback(){
    this.navCtrl.pop(AphoneverPage);
  }









}
