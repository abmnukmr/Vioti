import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TransitionPage} from "../transition/transition";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  transionpage=TransitionPage;

  shop_name:string="Abhimanyu IOT Enterprises";

  shop_location:string="Braeley California";

  shop_contactemail:string="abmnukmr@gmail.com";
  shop_contactphone:string="+91 9625255416";
  shop_contactwhatsapp:string=" +92 9625255416";
  shop_discription:string="Lora networks xbee, onion Omega, Raspberry Pi, Intel Edison, Arduino uno, Waio link, Intel galilio, Xbeee pro, Blynk CD";







  constructor(public navCtrl: NavController) {
  }
}
