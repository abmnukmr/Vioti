import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  NavController, NavParams, ViewController, Platform, ActionSheetController,
  ToastController, LoadingController, Loading
} from 'ionic-angular';
import {Camera, Crop} from "ionic-native";
import { File, Transfer, FilePath } from 'ionic-native';
import * as cropperjs from "cropperjs";
import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";
//import * as cropperjs from "cropperjs";
/*
 Generated class for the Additem page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var cordova: any;
declare var cordova: any;
@Component({
  selector: 'page-profilephoto',
  templateUrl: 'profilephoto.html'
})
export class ProfilephotoPage {
  lastImage=[] ;
  spinshow:boolean=true;
  loading: Loading;
  forupload:any;
  show:boolean=true;
  itemprice:any;
  butn:boolean=false;
  itemnumber:any;
  discription:any;
  base64Image;
  email1:string;
  itemname:any;
  images = [];
  imgin;
  targetimages=[];
//  private cropper:cropperjs.Cropper;

  @ViewChild('imageSrc') input: ElementRef;


  constructor(public navCtrl: NavController, public victrl:ViewController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content:"Uploading..."
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
  }


  Dismiss4() {
    this.victrl.dismiss();

  }


  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({

      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Gallery',
          icon: !this.platform.is('ios') ? 'md-aperture' : null,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);

            console.log('Gallery item');
          }
        },
        {
          text: 'Camera',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-camera' : null,
          handler: () => {

            this.takePicture(Camera.PictureSourceType.CAMERA);
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



  deletes(i) {
    this.images.splice(i, 1);

  }



  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      allowEdit:true,
      quality:60,
      targetHeight:1200,
      targetWidth:1200,

      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      this.base64Image = 'data:image/jpeg;base64,' + imagePath;
      this.images.unshift({url: imagePath});
      this.imgin = true;
      this.butn=true;
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }





  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".png";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage.push(newFileName);
      //  this.presentToast(this.lastImage);
//      this.targetimages.unshift(this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 8000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory+img;
    }
  }



  public uploadImage() {
    this.show=false;
   this.spinshow=false;
    this.loading.present();

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }
    // Destination URL
    var url = "https://vioti.herokuapp.com/profile/upload/email/profilepic/"+this.email1;

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    // this.presentToast(targetPath);
    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      httpMethod: "POST",
      //fileName: filename,
      headers:{
        'Access-Control-Allow-Origin':'*',
      },
      chunkedMode:true,
      mimeType: "image/png",
     // params : {itemname:this.itemname,itemno: this.itemnumber,discription:this.discription,itemprice:this.itemprice}
    };

    const fileTransfer = new Transfer();
    //this.presentToast(fileTransfer);


    // Use the FileTransfer to upload the image
    fileTransfer.upload( targetPath,url,options).then(data => {
      this.loading.dismissAll()
      console.log(data);
      this.spinshow=true;
      this.navCtrl.popTo(WalletPage);
      this.presentToast('Image succesfully uploaded.');
    }, err => {
      this.show=true;
      this.loading.dismissAll()
      this.presentToast("Failed");
      // console.log(err);
      // this.presentToast('Error while uploading file.');
    });
  }








}
