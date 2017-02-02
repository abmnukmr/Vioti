import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Titlediscription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titlediscription',
  templateUrl: 'titlediscription.html'
})
export class TitlediscriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitleeditorPage');
  }


  discription:string=this.navParams.get("shopdiscription");


  Dismiss(){
    this.victrl.dismiss();

  }


}
