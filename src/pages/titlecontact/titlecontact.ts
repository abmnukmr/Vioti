import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Titlecontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titlecontact',
  templateUrl: 'titlecontact.html'
})
export class TitlecontactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {}

  ionViewDidLoad() {
//    console.log('ionViewDidLoad TitleeditorPage');
  }

  phone:string=this.navParams.get("shopcontactphone");

  email:string=this.navParams.get("shopcontactemail");

   whatsapp:string=this.navParams.get("shopcontactwhatsapp");


  Dismiss(){
    this.victrl.dismiss();

  }


}
