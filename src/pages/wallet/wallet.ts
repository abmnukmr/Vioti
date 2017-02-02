import { Component } from '@angular/core';
import {NavController, ActionSheetController, Platform, ToolbarItem, ModalController} from 'ionic-angular';
import {TitleeditorPage} from "../titleeditor/titleeditor";
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {TitlediscriptionPage} from "../titlediscription/titlediscription";
import {TitleitemPage} from "../titleitem/titleitem";

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

    let modal = this.modalCtrl.create(TitleeditorPage);
    modal.present();

  }

  opencontact(){
    let modal = this.modalCtrl.create(TitlecontactPage);
    modal.present();

  }

  opendiscription(){

    let modal = this.modalCtrl.create(TitlediscriptionPage);
    modal.present();


  }

 openitem() {
   let modal = this.modalCtrl.create(TitleitemPage);
   modal.present();
 }
















}
