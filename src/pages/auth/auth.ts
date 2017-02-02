import {Component, ViewChild} from '@angular/core';
import {NavController, App, Slides} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import md5 from 'crypto-md5';
import {SignupPage} from "../signup/signup";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ForgotPage} from "../forgot/forgot";
import {LocationTracker} from "../../providers/location-tracker";

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
  @ViewChild(Slides) slides: Slides;
  tabpage=TabsPage;
  signup=SignupPage;
  forgot=ForgotPage;
  pet:string="login";
  email: any;
  password: any;
  profilePicture: any = "http://www.photato.in/images/user-photo.jpg"

  constructor(public navCtrl: NavController,private app: App,public formBuilder: FormBuilder,public location:LocationTracker) {
    this.location.startTracking();
  }

  emailChanged(){
    //this.profilePicture="https://www.gravatar.com/avatar/44830cc792898eca36922a70d98bf6ea"
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
     console.log(this.profilePicture);
  }



  ionViewDidLoad() {
    console.log('Hello AuthPage Page');
    this.location.startTracking();
  }

 }
