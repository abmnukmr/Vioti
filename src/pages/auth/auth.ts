import {Component, ViewChild} from '@angular/core';
import {
  NavController, App, Slides, NavParams, AlertController, LoadingController,
  ModalController
} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import md5 from 'crypto-md5';
import {SignupPage} from "../signup/signup";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgotPage} from "../forgot/forgot";
import {LocationTracker} from "../../providers/location-tracker";
import {Auth} from "../../providers/auth";

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

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
//    let EMAIL_REGEXP ='/^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i';
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
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
     this.authService.authgoogle().then( authService => {
       this.navCtrl.push(TabsPage);
       this.loading.dismiss();
     }, error => {

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
