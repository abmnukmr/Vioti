import { Component } from '@angular/core';
import {NavController, LoadingController, Loading} from 'ionic-angular';
import {Abmnu} from "../../providers/abmnu";

/*
  Generated class for the Wendor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wendor',
  templateUrl: 'wendor.html'
})
export class WendorPage {
  showThis:boolean=false;
  wendor:any;
  loading: Loading;
  email:string;
  col:boolean=false;
  col1:boolean=false;
  constructor(public navCtrl: NavController, public abmnu:Abmnu,public loadingCtrl:LoadingController ) {



    this.loading = this.loadingCtrl.create({
      content:"Loading..."
    });

    this.load();

  }



  load()
  {
    this.loading.present();
    this.email="abmnukmr@gmail.com";

    this.abmnu.getReviews(this.email).then((data) => {
        console.log(data);
        this.wendor =data;
         this.showThis=true;
       this.loading.dismissAll();
      console.log("get");
      if(this.wendor.status=="true"){
         this.col=true;
        console.log("gettttttt");
      }
     else {
         this.col1 =true;
      }
      });

      console.log("error");
  }

  doRefresh(refresher) {
    this.load();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

/*

  wendor=
    {
      "_id": "5898e365bcb80bc27b9269f3",
      "name":"abhimanyu Interprises",
      "location":"clifornis",
      "whatsapp":"+91 9625255416",
      "phone":"+91 9625255416",
      "email":"abmnukmr@gmail.com",
      "discription":"abhimany shop for electronics and xbee network",
      "folowers":"2",
      "status":"open",
      "item": [
        {"image":[
          {"img":"https://i.ytimg.com/vi/rFBxuK6z0DA/maxresdefault.jpg"},
          {"img":"https://i.ytimg.com/vi/ilwOlSb1bUs/maxresdefault.jpg"},
          {"img":"http://indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-8.jpg"}
          ],
          "price":"140/-",
          "discription":"my shop best item",
          "itemno":"#1"},
        {"image":[
          {"img":"http://indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-8.jpg"},
          {"img":"https://i.ytimg.com/vi/ilwOlSb1bUs/maxresdefault.jpg"},
          {"img":"https://i.ytimg.com/vi/rFBxuK6z0DA/maxresdefault.jpg"}
          ],
          "price":"140/-",
          "discription":"my shop best item",
          "itemno":"#1"}
      ]
    };

*/




}




