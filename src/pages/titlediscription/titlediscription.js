"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var firebase = require("firebase/app");
/*
  Generated class for the Titlediscription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TitlediscriptionPage = (function () {
    function TitlediscriptionPage(navCtrl, navParams, victrl, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.victrl = victrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.discription = this.navParams.get("shopdiscription");
        this.loading = this.loadingCtrl.create({
            content: "Saving..."
        });
    }
    TitlediscriptionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TitleeditorPage');
    };
    TitlediscriptionPage.prototype.Dismiss = function () {
        this.victrl.dismiss();
    };
    TitlediscriptionPage.prototype.updatedata = function () {
        var _this = this;
        console.log("updated start");
        this.loading.present();
        var user = firebase.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            this.email1 = user.email;
            var photoUrl = user.photoURL;
        }
        this.update = {
            discription: this.discription,
        };
        console.log("updated start");
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('https://vioti.herokuapp.com/profile/email/update/dis/' + this.email1, JSON.stringify(this.update), options)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log(data);
            _this.loading.dismissAll();
            _this.Dismiss();
            //this.navCtrl.push(WalletPage);
        }, function (err) {
            console.log("Error!:", err.json());
            _this.loading.dismissAll();
        });
        this.loading.dismissAll();
        this.Dismiss();
    };
    return TitlediscriptionPage;
}());
TitlediscriptionPage = __decorate([
    core_1.Component({
        selector: 'page-titlediscription',
        templateUrl: 'titlediscription.html'
    })
], TitlediscriptionPage);
exports.TitlediscriptionPage = TitlediscriptionPage;
