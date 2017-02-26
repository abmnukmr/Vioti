import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopopenPage');
  }


  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


}
