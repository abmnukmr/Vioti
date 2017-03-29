import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestOptions, Headers, Http} from "@angular/http";
import * as firebase from "firebase/app";
import {LocationTracker} from "../../providers/location-tracker";
import {Auth} from "../../providers/auth";
//import {Device} from '@ionic-native/device';

/*
  Generated class for the Shopopen page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopopen',
  templateUrl: 'shopopen.html'
})
export class ShopopenPage {
  public registerForm;
   phone:any;
   email1:any;
  address:any;
  update:any;
  loading:any;
  shop_name:any;
  spinshow:boolean=true;
  constructor(public toastCtrl: ToastController, public authService: Auth,public http:Http,public navCtrl: NavController,public location:LocationTracker, public navParams: NavParams,public formBuilder: FormBuilder,public loadingCtrl:LoadingController) {

    this.phone=this.navParams.get("phone");


    this.loading = this.loadingCtrl.create({
      content:"Wait.."});

    this.registerForm = formBuilder.group({
     // email: ['', Validators.compose([Validators.required])],
      //password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      fullname: ['', Validators.compose([Validators.required])],
      discription: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      catagory: ['', Validators.compose([Validators.required])],

      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      wphone: ['', Validators.compose([Validators.minLength(10), Validators.required])]

    });

  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 8000,
      position: 'top'
    });
    toast.present();
  }


  ionViewDidLoad() {
    this.presentToast("After submition of your shop opening request. App will be closed and you will be logged out for authentication security.")
    console.log('ionViewDidLoad ShopopenPage');
  }


  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

   openshop(){
     this.spinshow=false;
    this.loading.present();
      var user = firebase.auth().currentUser;
      if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
      }

    this.update = {
      name:this.registerForm.value.fullname,
      address:this.registerForm.value.address,
      phone:this.phone,
      lat: this.location.lat,
      lng:this.location.lng,
      //device:this.device.uuid,
      discription:this.registerForm.value.discription,
      catagory:this.registerForm.value.catagory,
    }


    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/profile/shop/add/' + this.email1, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
      this.loading.dismissAll();
      console.log("Shop open successfully")

      //this.navCtrl.push(WalletPage);
    }, err => {
      console.log("Error!:", err.json());
      this.loading.dismissAll();
    });
     console.log("dwrwe ooooops");
     setTimeout(() => {
       this.loading.dismissAll();
       this.authService.doLogout();

       navigator['app'].exitApp();

       console.log('Async operation has ended');
     }, 8000);

   }





}
