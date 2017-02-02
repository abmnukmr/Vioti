import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";

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
  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController,public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      age: ['']
    });

  }

  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

}
