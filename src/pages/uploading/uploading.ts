import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Alert, AlertController} from 'ionic-angular';
import {Transfer} from "ionic-native";
import {WalletPage} from "../wallet/wallet";
import * as firebase from "firebase";

/*
  Generated class for the Uploading page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-uploading',
  templateUrl: 'uploading.html'
})
export class UploadingPage {

  images: Array<string>

  uploading: boolean = true;
  current: number = 1;
  total: number;
  progress: number;

  constructor(private nav: NavController,
              private navParams: NavParams,
             public Alert:AlertController,
              private ngZone: NgZone) {

    this.images = this.navParams.get("images");
    if(!this.images || this.images.length == 0) {
      let alert = Alert.create({
        title: "Error",
        subTitle: "No images found to upload",
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

    this.total = this.images.length;
    this.upload(this.images[0]);
  }

  done = () : void => {
    this.nav.setRoot(WalletPage);
  }

  success = (result: any) : void => {
    if(this.current < this.total) {
      this.current++;
      this.progress = 0;
      this.upload(this.images[this.current - 1]);
    } else {
      this.uploading = false;
    }
  }

  failed = (err: any) : void => {
    let code = err.code;
    alert("Failed to upload image. Code: " + code);
  }

  onProgress =  (progressEvent: ProgressEvent) : void => {
    this.ngZone.run(() => {
      if (progressEvent.lengthComputable) {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log(progress);
        this.progress = progress
      }
    });
  }

  upload = (image: string) : void => {
    let ft = new Transfer();
    let filename = Date.now() + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type' : undefined
      },
      params: {
        fileName: filename
      }
    };
    ft.onProgress(this.onProgress);

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
       var email = user.email;
      var  photoUrl = user.photoURL;}
      var url="https://vioti.herokuapp.com/profile/upload/email/"+email;
    ft.upload(image, url, options, false)
      .then((result: any) => {
        this.success(result);
      }).catch((error: any) => {
      this.failed(error);
    });
  }
}
