import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Shopdata} from "../../providers/shopdata";
import {WendorPage} from "../wendor/wendor";
import {LocationTracker} from "../../providers/location-tracker";

/*
  Generated class for the Morelocal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-morelocal',
  templateUrl: 'morelocal.html'
})
export class MorelocalPage {
  searching:boolean=true;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _shopdata:Shopdata,public locationTracker: LocationTracker) {
    this.load(locationTracker.lat,locationTracker.lng);

  }

  ionViewDidLoad() {
    this.load(this.locationTracker.lat,this.locationTracker.lng);

    console.log('ionViewDidLoad MorelocalPage');
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
