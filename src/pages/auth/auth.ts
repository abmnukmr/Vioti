import {Component, ViewChild} from '@angular/core';
import {
  NavController, App, Slides, NavParams, AlertController, LoadingController,
  ModalController, Platform
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
  forgot=ForgotPage;
  signup=SignupPage;
  userProfile: any = null;
   public user:any;
  public fireAuth: any;
  public userData: any;

  constructor(public googleAuth: GoogleAuth, public navCtrl: NavController,public modalCtrl: ModalController,
              public af: AngularFire,
              public alertController : AlertController,
              private platform: Platform  ,   public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
//    let EMAIL_REGEXP ='/^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i';
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });



    this.fireAuth = firebase.auth();

    this.af.auth.subscribe(user => {
      if(user) {
        //alert(‘fire user logged in’);
       this.user = user;
      }else {
        //alert(‘fire user logged out’);
       this.user = {};
      }
    });

  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
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

  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then( authService => {
        this.navCtrl.pop(TabsPage);
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


}
