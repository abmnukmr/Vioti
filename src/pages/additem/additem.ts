import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, Platform, ActionSheetController} from 'ionic-angular';
import {Camera} from "ionic-native";
//import * as cropperjs from "cropperjs";
/*
  Generated class for the Additem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html'
})
export class AdditemPage {

  base64Image;
  images=[];
  imgin;
  private cropper;

  @ViewChild('imageSrc') input: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController,public platform:Platform, public actionsheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
  }


  Dismiss4(){
    this.victrl.dismiss();

  }


  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({

      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Gallery',
          icon: !this.platform.is('ios') ? 'md-aperture' : null,
          handler: () => {
            this.accessGallery();

            console.log('Gallery item');
          }
        },
        {
          text: 'Camera',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-camera' : null,
          handler: () => {
            console.log('Delete clicked');
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


  accessGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.images.unshift({url:this.base64Image});
      this.imgin=true;
    },
      (err) => {
      console.log(err);
    });
  }

  deletes(i) {
    this.images.splice(i, 1);

  }

}
