import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TermsPage} from "../terms/terms";
import {PhoneverPage} from "../phonever/phonever";

/*
  Generated class for the Otp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html'
})
export class OtpPage {
  term=TermsPage;
 phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phone=this.navParams.get("phone");

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad OtpPage');

  }
  goto(){
   this.navCtrl.push(TermsPage,{"phone":this.phone});
  }

  senback(){
    this.navCtrl.pop(PhoneverPage);
  }

}
