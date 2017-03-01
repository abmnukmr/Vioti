import { Component } from '@angular/core';
import {
  NavController, ActionSheetController, Platform, ToolbarItem, ModalController, Loading,
  LoadingController, Alert, AlertController
} from 'ionic-angular';
import {TitleeditorPage} from "../titleeditor/titleeditor";
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {TitlediscriptionPage} from "../titlediscription/titlediscription";
import {TitleitemPage} from "../titleitem/titleitem";
import {AdditemPage} from "../additem/additem";
import {Abmnu} from "../../providers/abmnu";
import {ShopopenPage} from "../shopopen/shopopen";
import {Http} from "@angular/http";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase/app";
import {EdititemPage} from "../edititem/edititem";

/*
  Generated class for the Wallet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  data: any;
  email1:any;
  wendor:any;
  item_name:any;
  item_no:any;
  item_discription:any;
  item_price:any;
  showThis:boolean=false;
  loading:Loading;
  open=false;
  shopopen=ShopopenPage;
  constructor(public loadingCtrl:LoadingController,public http:Http,public alertCtrl: AlertController,public connectivityService:ConnectivityService, public navCtrl: NavController,public abmnu:Abmnu,public actionsheetCtrl: ActionSheetController,public platform:Platform,public modalCtrl:ModalController) {
    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });



    //this.abmnu.errror

    console.log('wallet init');


   // console.log(this.abmnu.errror);

    this.loading.present();
    this.getReviews();

  }

  getReviews(){


    if(this.connectivityService.isOnline())
    {


      var user = firebase.auth().currentUser;
      if (user != null) {
        var  name = user.displayName;
        this.email1 = user.email;
        var  photoUrl = user.photoURL;
      }

      if (this.data) {
        console.log("g");
        // return Promise.resolve(this.data);
        return new Promise(resolve => {


          this.http.get('https://vioti.herokuapp.com/profile/' + this.email1)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
                //console.log(data);
                this.wendor = data;
                this.showThis = true;
                this.open = false;
                this.loading.dismissAll();

                console.log("reloded");

              },
              err => {
                this.showThis = false;
                this.open = true;
                console.log("data not matched");
                this.loading.dismissAll();

                console.log("Oops!");

              }
            );


        });


      }

      return new Promise(resolve => {


        this.http.get('https://vioti.herokuapp.com/profile/' + this.email1)
          .map(res => res.json())
          .subscribe(data => {
              this.data = data;
              resolve(this.data);
              this.wendor = data;
              this.showThis = true;
              this.open = false;
              this.loading.dismissAll();

              //console.log(data);
              console.log("ghdgggg");


            },

            err => {
              //
              //      this.data={"error":"error"};
              this.showThis = false;
              this.open = true;
              console.log("data not matched");
              this.loading.dismissAll();

              console.log("Oops");

              //  return this.errror=2;


            },
            () => {
              console.log("Done");
//              errror=2;

              //return this.errror=2;

            }
          );


      });
    }

    else {
      this.loading.dismissAll();

      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'No Internet Connectivity..',
        buttons: [
          {
          text:'Try Again',
           handler:()=>{
             this.getReviews();
           }
          }
        ]
      });
      alert.present();
    }
  }





  openMenu(id,itemname,itemno,itemdiscription,itemprice) {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-create' : null,
          handler: () => {
            this.edit(id,itemname,itemno,itemdiscription,itemprice);
           // console.log('Delete clicked');
          }
        },
        {
          text: 'Delete',
          icon: !this.platform.is('ios') ? 'md-trash' : null,
          handler: () => {
            this.showConfirm(id);
            console.log('Share clicked');
          }
        },

        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'md-share' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  doRefresh(refresher) {
    this.getReviews();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  showConfirm(id) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'this item will be remove from you list item',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteReview(id)
          }
        }
      ]
    });
    confirm.present();
  }


  deleteReview(id) {

    this.http.get('https://vioti.herokuapp.com/profile/email/'+this.email1+'/delete/' + id).subscribe((res) => {

      console.log(res.json());

     let index = this.wendor.item.indexOf(this.wendor.item);
     this.wendor.item.splice(id, 1);
      setTimeout(() => {
        console.log('Async operation has ended');
        this.getReviews();
      }, 2000);

    });

  }


  edit(id,itemname,itemno,itemdiscription,itemprice){
    let modal = this.modalCtrl.create(EdititemPage,{item_name:itemname,item_no:itemno,item_price:itemprice,item_discription:itemdiscription,_id:id});
    modal.present();


  }


    openeditor(){

    let modal = this.modalCtrl.create(TitleeditorPage,{shopname:this.wendor.name,shoplocation:this.wendor.location});
    modal.present();

  }

  opencontact(){
    let modal = this.modalCtrl.create(TitlecontactPage,{shopcontactemail:this.wendor.email,shopcontactphone:this.wendor.phone,shopcontactwhatsapp:this.wendor.whatsapp});
    modal.present();

  }

  opendiscription(){

    let modal = this.modalCtrl.create(TitlediscriptionPage,{shopdiscription:this.wendor.discription});
    modal.present();


  }

 openitem() {
   let modal = this.modalCtrl.create(TitleitemPage);
   modal.present();
 }

  additem(){

    let modal = this.modalCtrl.create(AdditemPage);
    modal.present();


  }
















}
