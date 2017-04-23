import {Component, ViewChild} from '@angular/core';
import {
  NavController, App, Slides, NavParams, AlertController, LoadingController,
  ModalController, Platform, ToastController
} from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';

import {TabsPage} from "../tabs/tabs";
import md5 from 'crypto-md5';
import {SignupPage} from "../signup/signup";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgotPage} from "../forgot/forgot";
import {LocationTracker} from "../../providers/location-tracker";
import {Auth} from "../../providers/auth";
import { AngularFire, FirebaseAuthState,  } from 'angularfire2';
import {GooglePlus} from 'ionic-native';
import firebase from 'firebase'
import {HomePage} from "../home/home";
import {AuthProvider} from "../../providers/auth-provider";
import {RequestOptions, Headers, Http} from "@angular/http";

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
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  tabBarElement: any;
  update:any;
  email1:any;
  name:any;
  photoUrl:any;
  verified:boolean;
  forgot=ForgotPage;
  signup=SignupPage;
  userProfile: any = null;
  public user:any;
  public fireAuth: any;
  public userData: any;

  constructor(public googleAuth: GoogleAuth, public navCtrl: NavController,public modalCtrl: ModalController,public _provider:AuthProvider,
              public af: AngularFire,public toastCtrl: ToastController,
              public locationTracker: LocationTracker,
              public http:Http,
              public alertController : AlertController,
              private platform: Platform  ,   public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

//    let EMAIL_REGEXP ='/^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i';
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });


    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.fireAuth = firebase.auth();

   this.verfy();
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    // this.navCtrl.pop();
  }


  googlePlusLogin()
  {

    this.af.auth.subscribe((data: FirebaseAuthState) => {

      this.af.auth.unsubscribe()
      console.log("in auth subscribe", data)

      this.platform.ready().then(() => {
        GooglePlus.login({
          'webClientId' : '553959685910-2ipcgm9ei606n9tbglevlscv8s056tdt.apps.googleusercontent.com'
        })
          .then((userData) => {

            console.log("userData " + JSON.stringify(userData));
            console.log("firebase " + firebase);
            var provider = this.fireAuth.GoogleAuthProvider.credential(userData.idToken);

            firebase.auth().signInWithCredential(provider)
              .then((success) => {
                console.log("Firebase success: " + JSON.stringify(success));
                this.displayAlert(JSON.stringify(success),"signInWithCredential successful")
                this.userProfile = success;

              })
              .catch((error) => {
                console.log("Firebase failure: " + JSON.stringify(error));
                this.displayAlert(error,"signInWithCredential failed")
              });

          })
          .catch((gplusErr) => {
            console.log("GooglePlus failure: " + JSON.stringify(gplusErr));
            this.displayAlert(JSON.stringify(gplusErr),"GooglePlus failed")
          });

      })
    })

  }



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 6000,
      position: 'top'
    });
    toast.present();
  }

  displayAlert(value,title)
  {
    let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
        {
          text: "OK"
        }
      ]
    });
    coolAlert.present();

  }

logg(){
  this._provider.googlePlusLogin();
}



googlelog(){
  this._provider.loginWithGoogle().subscribe((success) => {
      console.log(success);
     // alert("success");


    var user = firebase.auth().currentUser;
    if (user != null) {
      this.name = user.displayName;
      this.email1 = user.email;
      this.photoUrl = user.photoURL;
    }


    if(this.email1 != null)
    {
      this.updatedata(this.name,this.email1);
      this.navCtrl.setRoot(TabsPage);

    }
    else{
      alert(
        "We don't have access of your emailId."
      );
    }


    }, err => {
    alert(err);
      console.log(err);
    });
}

  loginWithFacebook(): void{
    this._provider.loginWithFacebook().subscribe((success) => {

      var user = firebase.auth().currentUser;
      if (user != null) {
        this.name = user.displayName;
        this.email1 = user.email;
        this.photoUrl = user.photoURL;
      }

      if(this.email1 != null)
      {
       this.updatedata(this.name,this.email1);
        this.navCtrl.setRoot(TabsPage);

      }
      else{
        alert(
          "We don't have access of your emailId."
           );
      }
    console.log(success);
  }, err => {
    console.log(err);
  });
}













  register(){

    let modal = this.modalCtrl.create(SignupPage);
    /* let  me = this;
     modal.onDidDismiss(data => {
     this.address.place = data;
     });*/
    // modal.present(modal);
    console.log("modal not working")
    modal.present();

  }

  resetPwd(){

    let modal = this.modalCtrl.create(ForgotPage);
    /* let  me = this;
     modal.onDidDismiss(data => {
     this.address.place = data;
     });*/
    // modal.present(modal);
    console.log("modal not working")
    modal.present();

  }



  googlrlogin(){
    this.googleAuth.login().then((success)=>{

      this.navCtrl.push(TabsPage);

    });
  }

  verfy(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.emailVerified) {

        this.verified=true;
        console.log('Email is verified');
      }
      else {
        this.verified=false;
        console.log('Email is not verified');
      }
    });
  }



  updatedata( name,email) {

    this.update = {
      name:name,
      phone:"99999999999",
      lat:this.locationTracker.lat,
      lng:this.locationTracker.lng,
      email:email,
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
















  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else {


        this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then(authService => {

          firebase.auth().onAuthStateChanged((user)=> {
            if (user.emailVerified) {

              this.navCtrl.setRoot(TabsPage);

              console.log('Email is verified');
            }
            else {
              this.verified=false;
              firebase.auth().onAuthStateChanged(function(user) {
                user.sendEmailVerification();
              });

              this.presentToast("Please verify your account by sent verfication link to your email");
              console.log('Email is not verified');
            }
          });



          this.loading.dismiss();
        }, error => {
          this.loading.dismiss().then(() => {
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








}
