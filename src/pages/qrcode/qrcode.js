"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("firebase/app");
/*
  Generated class for the Qrcode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var QrcodePage = (function () {
    function QrcodePage(navCtrl, navParams, victrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.victrl = victrl;
        this.shopname = this.navParams.get("shopname");
        //shopname:this.wendor.name,shopimage:this.wendor.profileimage,shopcata:this.wendor.catagory
        this.shopimage = this.navParams.get("shopimage");
        this.shopcata = this.navParams.get("shopcata");
        var qrdata = {
            shopname: this.shopname,
            shopimage: this.shopimage,
            shopcata: this.shopcata
        };
        var user = firebase.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            this.email1 = user.email;
            var photoUrl = user.photoURL;
        }
        this.qrdata = {
            shopemail: this.email1,
            shopname: this.shopname,
            shopimage: this.shopimage,
            shopcata: this.shopcata
        };
        this.qrdata1 = JSON.stringify(this.qrdata);
    }
    QrcodePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrcodePage');
    };
    QrcodePage.prototype.Dismiss = function () {
        this.victrl.dismiss();
    };
    return QrcodePage;
}());
QrcodePage = __decorate([
    core_1.Component({
        selector: 'page-qrcode',
        templateUrl: 'qrcode.html',
    })
], QrcodePage);
exports.QrcodePage = QrcodePage;
