"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var ionic_native_2 = require("ionic-native");
var firebase = require("firebase/app");
var wallet_1 = require("../wallet/wallet");
var ProfilephotoPage = (function () {
    function ProfilephotoPage(navCtrl, victrl, actionSheetCtrl, toastCtrl, platform, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.victrl = victrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.lastImage = [];
        this.images = [];
        this.targetimages = [];
    }
    ProfilephotoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdditemPage');
    };
    ProfilephotoPage.prototype.Dismiss4 = function () {
        this.victrl.dismiss();
    };
    ProfilephotoPage.prototype.openMenu = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Gallery',
                    icon: !this.platform.is('ios') ? 'md-aperture' : null,
                    handler: function () {
                        _this.takePicture(ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY);
                        console.log('Gallery item');
                    }
                },
                {
                    text: 'Camera',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'md-camera' : null,
                    handler: function () {
                        _this.takePicture(ionic_native_1.Camera.PictureSourceType.CAMERA);
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfilephotoPage.prototype.deletes = function (i) {
        this.images.splice(i, 1);
    };
    ProfilephotoPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            allowEdit: true,
            quality: 60,
            targetHeight: 1200,
            targetWidth: 1200,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        ionic_native_1.Camera.getPicture(options).then(function (imagePath) {
            _this.base64Image = 'data:image/jpeg;base64,' + imagePath;
            _this.images.unshift({ url: imagePath });
            _this.imgin = true;
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY) {
                ionic_native_2.FilePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    // Create a new name for the image
    ProfilephotoPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".png";
        return newFileName;
    };
    // Copy the image to a local folder
    ProfilephotoPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        ionic_native_2.File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage.push(newFileName);
            //  this.presentToast(this.lastImage);
            //      this.targetimages.unshift(this.lastImage);
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    ProfilephotoPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 8000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    ProfilephotoPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ProfilephotoPage.prototype.uploadImage = function () {
        var _this = this;
        var user = firebase.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            this.email1 = user.email;
            var photoUrl = user.photoURL;
        }
        // Destination URL
        var url = "https://vioti.herokuapp.com/profile/upload/email/profilepic/" + this.email1;
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // this.presentToast(targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            httpMethod: "POST",
            //fileName: filename,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            chunkedMode: true,
            mimeType: "image/png",
        };
        var fileTransfer = new ionic_native_2.Transfer();
        //this.presentToast(fileTransfer);
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            console.log(data);
            _this.navCtrl.popTo(wallet_1.WalletPage);
            _this.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast("Failed");
            // console.log(err);
            // this.presentToast('Error while uploading file.');
        });
    };
    return ProfilephotoPage;
}());
__decorate([
    core_1.ViewChild('imageSrc')
], ProfilephotoPage.prototype, "input", void 0);
ProfilephotoPage = __decorate([
    core_1.Component({
        selector: 'page-profilephoto',
        templateUrl: 'profilephoto.html'
    })
], ProfilephotoPage);
exports.ProfilephotoPage = ProfilephotoPage;
