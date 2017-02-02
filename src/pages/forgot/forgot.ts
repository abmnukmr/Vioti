import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormGroup, FormBuilder} from "@angular/forms";

/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

  slideOneForm: FormGroup;

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      age: ['']
    });

  }

  ionViewDidLoad() {
    console.log('Hello ForgotPage Page');
  }

}
