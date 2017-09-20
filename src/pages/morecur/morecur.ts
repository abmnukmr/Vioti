import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Shopdata} from "../../providers/shopdata";
import {WendorPage} from "../wendor/wendor";

/*
  Generated class for the Morecur page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-morecur',
  templateUrl: 'morecur.html'
})
export class MorecurPage {
  searching:boolean=true;
 items:any;
 lat:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _shopdata:Shopdata) {
    this.load(this.navParams.get("lat"),this.navParams.get("lng"));
     this.lat=this.navParams.get("lat");

  }

  ionViewDidLoad() {
    this.load(this.navParams.get("lat"),this.navParams.get("lng"));
    console.log('ionViewDidLoad MorecurPage');
  }

  load(lat,lng) {

    console.log("gjgjh");
    this._shopdata.load(lat,lng).then((data) => {
      console.log(data);
      this.searching=false;
      this.items =data;
      // console.log(this.items);
      console.log("callback"+JSON.stringify(data));

      return this.items;
    });
  }
  goto(email){
    this.navCtrl.push(WendorPage,{"email":email});
  }




}
