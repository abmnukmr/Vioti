import { Component } from '@angular/core';

import {NavController, Loading, LoadingController} from 'ionic-angular';
import * as firebase from "firebase/app";
import {Favourite} from "../../providers/favourite";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items:any;
  loading:Loading;
  data: any;
  finalstatus:string;
  finalstatuss:string;
  email1:any;
  wendor:any;
  item_name:any;
  item_no:any;
  item_discription:any;
  icon:any;
  favi:any;
  item_price:any;
  showThis:boolean=false;
  open=false;

  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController,public _favrouite:Favourite) {


  }






}
