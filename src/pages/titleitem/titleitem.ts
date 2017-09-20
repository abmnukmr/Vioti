import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Titleitem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titleitem',
  templateUrl: 'titleitem.html'
})
export class TitleitemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {}

  ionViewDidLoad() {
   // console.log('ionViewDidLoad TitleeditorPage');
  }


  Dismiss(){
    this.victrl.dismiss();

  }


}
