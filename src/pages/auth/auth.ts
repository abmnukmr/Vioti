import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import md5 from 'crypto-md5';

/*
  Generated class for the Auth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
  tabpage=TabsPage;
  masks: any;
  pet:string="login";
  email: any;
  password: any;
  profilePicture: any = "http://www.photato.in/images/user-photo.jpg"

  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";
  constructor(public navCtrl: NavController) {
    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
      orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
  }

  emailChanged(){
    //this.profilePicture="https://www.gravatar.com/avatar/44830cc792898eca36922a70d98bf6ea"
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
     console.log(this.profilePicture);
  }


  ionViewDidLoad() {
    console.log('Hello AuthPage Page');
  }
}
