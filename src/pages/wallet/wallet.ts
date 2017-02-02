import { Component } from '@angular/core';
import {NavController, ActionSheetController, Platform, ToolbarItem, ModalController} from 'ionic-angular';
import {TitleeditorPage} from "../titleeditor/titleeditor";
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {TitlediscriptionPage} from "../titlediscription/titlediscription";
import {TitleitemPage} from "../titleitem/titleitem";
import {AdditemPage} from "../additem/additem";

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

  constructor(public navCtrl: NavController,public actionsheetCtrl: ActionSheetController,public platform:Platform,public modalCtrl:ModalController) {}

  ionViewDidLoad() {
    console.log('Hello WalletPage Page');
  }

  shop_name:string="Abhimanyu IOT Enterprises";

  shop_location:string="Braeley California";

  shop_contactemail:string="abmnukmr@gmail.com";
  shop_contactphone:string="+91 9625255416";
  shop_contactwhatsapp:string=" +92 9625255416";
   shop_discription:string="Lora networks xbee, onion Omega, Raspberry Pi, Intel Edison, Arduino uno, Waio link, Intel galilio, Xbeee pro, Blynk CD";



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

    let modal = this.modalCtrl.create(TitleeditorPage,{shopname:this.shop_name,shoplocation:this. shop_location});
    modal.present();

  }

  opencontact(){
    let modal = this.modalCtrl.create(TitlecontactPage,{shopcontactemail:this.shop_contactemail,shopcontactphone:this.shop_contactphone,shopcontactwhatsapp:this.shop_contactwhatsapp });
    modal.present();

  }

  opendiscription(){

    let modal = this.modalCtrl.create(TitlediscriptionPage,{shopdiscription:this.shop_discription});
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
