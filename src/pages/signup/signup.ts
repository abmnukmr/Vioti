import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../providers/auth";
import {HomePage} from "../home/home";
import {AuthPage} from "../auth/auth";
import * as firebase from "firebase/app";
import {Headers, RequestOptions, Http} from "@angular/http";
import {LocationTracker} from "../../providers/location-tracker";

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  update:any;

  constructor(public http:Http,public locationTracker: LocationTracker,public navCtrl: NavController,public toastCtrl: ToastController, public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      fullname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])],

    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 6000,
      position: 'top'
    });
    toast.present();
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password,this.registerForm.value.phone,this.registerForm.value.fullname).then( authService => {

        firebase.auth().onAuthStateChanged(function(user) {
          user.sendEmailVerification();
        });

        this.updatedata();
          this.presentToast("Verfication mail sent Successfully. Verify your account");
        this.navCtrl.pop(AuthPage);

        this.loading.dismiss();
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }


  updatedata() {

    this.update = {
      name:this.registerForm.value.fullname,
      phone:this.registerForm.value.phone,
      lat:this.locationTracker.lat,
      lng:this.locationTracker.lng,
      email:this.registerForm.value.email,
      otp:"123456"

    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/user/create/new', JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
      //this.navCtrl.push(WalletPage);
    }, err => {

      console.log("user  Not  inseted in mongo db");

    });


  }



}
