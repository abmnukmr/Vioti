import { Component } from '@angular/core';
import {
  NavController, ActionSheetController, Platform, ToolbarItem, ModalController, Loading,
  LoadingController
} from 'ionic-angular';
import {TitleeditorPage} from "../titleeditor/titleeditor";
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {TitlediscriptionPage} from "../titlediscription/titlediscription";
import {TitleitemPage} from "../titleitem/titleitem";
import {AdditemPage} from "../additem/additem";
import {Abmnu} from "../../providers/abmnu";

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
  email:any;
  wendor:any;
  showThis:boolean=false;
  loading:Loading;
  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController,public abmnu:Abmnu,public actionsheetCtrl: ActionSheetController,public platform:Platform,public modalCtrl:ModalController) {
    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });
    this.loading.present();

    this.load();
  }
  load()
  {
    this.email="abmnukmr@gmail.com";

    this.abmnu.getReviews(this.email).then((data) => {
      console.log(data);
      this.wendor =data;
      this.showThis=true;
        this.loading.dismissAll();
      console.log("goingggggggggg");
    });


    console.log("goooooooooooo");
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Item',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-create' : null,
          handler: () => {
            this.openitem();
            console.log('Delete clicked');
          }
        },
        {
          text: 'Delete',
          icon: !this.platform.is('ios') ? 'md-trash' : null,
          handler: () => {
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
