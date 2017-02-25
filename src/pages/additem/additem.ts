import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  NavController, NavParams, ViewController, Platform, ActionSheetController,
  ToastController, LoadingController, Loading
} from 'ionic-angular';
import {Camera, Crop} from "ionic-native";
import { File, Transfer, FilePath } from 'ionic-native';
import * as cropperjs from "cropperjs";
import * as firebase from "firebase/app";
//import * as cropperjs from "cropperjs";
/*
  Generated class for the Additem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html'
})
export class AdditemPage {
  lastImage=[] ;
  loading: Loading;
  forupload:any;
  base64Image;
  email1:string;
  images = [];
  imgin;
  targetimages=[];
//  private cropper:cropperjs.Cropper;

  @ViewChild('imageSrc') input: ElementRef;


  constructor(public navCtrl: NavController, public victrl:ViewController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
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


  accessGallery() {
    Camera.getPicture({

    //  destinationType: Camera.DestinationType.FILE_URI,
     // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,

      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit:true,
      quality:80,
      targetHeight:1500,
      targetWidth:1500
    }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.images.unshift({url: this.base64Image});
        this.imgin = true;
      },
      (err) => {
        console.log(err);
      });
  }

  accesscam() {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit:true,
      quality:80,
      targetHeight:1500,
      targetWidth:1500
    }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.images.unshift({url: this.base64Image});
        this.imgin = true;
      },
      (err) => {
        console.log(err);
      });
  }

  deletes(i) {
    this.images.splice(i, 1);

  }


   ////

/*
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {

      allowEdit:true,
      quality:80,
      targetHeight:1500,
      targetWidth:1500,
      destinationType: Camera.DestinationType.DATA_URL,

      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library


      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {

///            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
   //         let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));


            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);

            let currentNameBuilder = imagePath.substr(imagePath.lastIndexOf('/')+1);

            let currentName = currentNameBuilder.substr(0,currentNameBuilder.lastIndexOf('?'));

            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());




            // this.presentToast(correctPath+"filename="+currentName);

            //let currentNameBuilder = imagePath.substr(imagePath.lastIndexOf('/')+1);

            //let currentName = currentNameBuilder.substr(0,currentNameBuilder.lastIndexOf('?'));

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

  */

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      allowEdit:true,
      quality:80,
      targetHeight:1500,
      targetWidth:1500,

      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      this.base64Image = 'data:image/jpeg;base64,' + imagePath;
      this.images.unshift({url: this.base64Image});
      this.imgin = true;

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
      this.lastImage.unshift(newFileName);
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
      return cordova.file.dataDirectory + img;
    }
  }



  public uploadImage() {


    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }
    // Destination URL
    var url =encodeURI ("https://vioti.herokuapp.com/profile/upload/email/abmnukmr@gmail.com");

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    this.presentToast(targetPath);
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
      params : {'fileName': filename}
    };

    const fileTransfer = new Transfer();
    this.presentToast(fileTransfer);

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload('https://vioti.herokuapp.com/profile/upload/email/abmnukmr@gmail.com', targetPath,options).then(data => {
      this.loading.dismissAll()
      console.log(data);
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast(err);
      console.log(err);
     // this.presentToast('Error while uploading file.');
    });
  }








}
