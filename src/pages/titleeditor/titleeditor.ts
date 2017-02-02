import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Titleeditor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titleeditor',
  templateUrl: 'titleeditor.html'
})
export class TitleeditorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitleeditorPage');
  }

  shopname:string=this.navParams.get("shopname");
  shoplocation:string=this.navParams.get("shoplocation");

  Dismiss(){
    this.victrl.dismiss();

  }




}
