import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import {OtpPage} from "../otp/otp";
import {TermsPage} from "../terms/terms";

/*
  Generated class for the Phonever page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-phonever',
  templateUrl: 'phonever.html'
})
export class PhoneverPage {
  registerForm:any;

  ottp=OtpPage;
 terms=TermsPage;
 phone:any;
  submitAttempt: boolean = false;
  num:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public toastCtrl: ToastController) {

    this.num = Math.floor(Math.random() * 900000) + 100000;

    this.registerForm = formBuilder.group({

      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])]

    });
  }


  gotonext() {

//  this.submitAttempt = true;

    if (this.registerForm.value.phone==null||this.registerForm.value.phone==''){
     this.presentToast("please fill your 10 Digit Mobile No");
      console.log(this.registerForm.value);
    } else {


      this.navCtrl.push(OtpPage, {"phone": this.registerForm.value.phone});

    }

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

}
