import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Choosloc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choosloc',
  templateUrl: 'choosloc.html'
})
export class ChooslocPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ChooslocPage Page');
  }

}
