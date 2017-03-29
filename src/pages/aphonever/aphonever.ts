import { Component } from '@angular/core';
import {NavController, NavParams, Loading, LoadingController, ToastController, ViewController} from 'ionic-angular';
import {RequestOptions, Headers, Http} from "@angular/http";
import * as firebase from "firebase/app";
import {OtpPage} from "../otp/otp";
import {Validators, FormBuilder} from "@angular/forms";
import {AotpPage} from "../aotp/aotp";

/*
  Generated class for the Aphonever page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aphonever',
  templateUrl: 'aphonever.html'
})
export class AphoneverPage {
  registerForm:any;

  ottp=OtpPage;
  phone:any;
  email1:any;
  update:any;
  spinshow:boolean=true;
  loading:Loading;
  submitAttempt: boolean = false;
  num:any;
  name:any;
  constructor(public victrl:ViewController,public loadingCtrl:LoadingController,public http:Http,public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public toastCtrl: ToastController) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      this.name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }


    this.registerForm = formBuilder.group({

      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])]

    });
    this.loading = this.loadingCtrl.create({
      content:"Sending OTP..."
    });
  }


  gotonext() {

    this.navCtrl.setRoot(AotpPage, {"phone": this.registerForm.value.phone});


  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneverPage');
  }


  sendotp(otp,user){
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.get('http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?user=abmnu_kmr&password=Arjunsingh1$&msisdn='+this.registerForm.value.phone+'&sid=VAIOTI&msg=Dear user, VAIOTI welcomes you. Now you proceed with this OTP '+otp+'.&fl=0&gwid=2',options).subscribe((res) => {

      console.log(res.json());

    });

  }



  updatedata() {

    this.loading.present();
    this.num = Math.floor(Math.random() * 900000) + 100000;


    if (this.registerForm.value.phone == null || this.registerForm.value.phone == '') {
      this.presentToast("please fill your 10 Digit Mobile No");
      console.log(this.registerForm.value);
      this.loading.dismissAll();

    }
    else {
      this.spinshow=false;

      this.sendotp(this.num,this.name);

      console.log("updated start2432424");
      var user = firebase.auth().currentUser;
      if (user != null) {
        var name = user.displayName;
        this.email1 = user.email;
        var photoUrl = user.photoURL;
      }




      this.update = {
        otp: this.num,
        phone:this.registerForm.value.phone
      }
      console.log("updated start576575757");

      var headers = new Headers();
      headers.append('content-type', 'application/json;charset=UTF-8');
      headers.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({headers: headers});
      //https://vioti.herokuapp.com/user/create/otp/'
      console.log("done otppp sending...");
      this.http.post('https://vioti.herokuapp.com/user/create/otp/' + this.email1, JSON.stringify(this.update), options)
        .map(res => res.json()).subscribe(data => {
        console.log("done otp sending...");
        this.gotonext();
        console.log(data);
        this.loading.dismissAll();
        this.spinshow=true;

      }, err => {
        console.log("Error!:", err.json());



      });
      console.log("dwrwe ooooops");
      setTimeout(() => {
        this.loading.dismissAll();
        this.gotonext();
        this.spinshow=true;


        console.log('Async operation has ended');
      }, 8000);

    }


  }


  Dismiss(){
    this.victrl.dismiss();

  }


}




