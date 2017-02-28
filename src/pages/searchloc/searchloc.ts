import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, Searchbar} from 'ionic-angular';

/*
  Generated class for the Searchloc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-searchloc',
  templateUrl: 'searchloc.html'
})
export class SearchlocPage {
  @ViewChild('searchbar') searchbar:Searchbar;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchlocPage');
  }

  ionViewDidEnter() {
    setTimeout(()=>{
      console.log("Searchbar open")
      this.searchbar.setFocus();
    },2);}


  dismiss4() {
    this.viewCtrl.dismiss();
  }






}
