import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShopopenPage} from "../shopopen/shopopen";

/*
  Generated class for the Terms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})

export class TermsPage {
  chech:boolean=false;
   phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phone=this.navParams.get("phone");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }
  goto(){
    this.navCtrl.push(ShopopenPage,{"phone":this.phone});
  }
 chnge(){
    if(this.chech==false){
      this.chech=true;
    }
    else {
      this.chech=false;
    }
 }



}
