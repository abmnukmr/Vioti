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
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EdititemPage = (function () {
    function EdititemPage(victrl, navCtrl, navprms, http, loadingCtrl) {
        this.victrl = victrl;
        this.navCtrl = navCtrl;
        this.navprms = navprms;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.itemname = this.navprms.get("item_name");
        this.itemnumber = this.navprms.get("item_no");
        this.discription = this.navprms.get("item_discription");
        this.itemprice = this.navprms.get("item_price");
        // this.itemprice=this.navprms.get("_id");
        this.id = this.navprms.get("_id");
        this.loading = this.loadingCtrl.create({
            content: "Saving..."
        });
    }
    EdititemPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EdititemPage');
    };
    EdititemPage.prototype.updatedata = function () {
        var _this = this;
        this.loading.present();
        var user = firebase.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            this.email1 = user.email;
            var photoUrl = user.photoURL;
        }
        this.update = {
            item_name: this.itemname,
            item_number: this.itemnumber,
            item_discription: this.discription,
            item_price: this.itemprice,
            item_id: this.id
        };
        console.log("updated start");
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('https://vioti.herokuapp.com/profile/email/update/item/' + this.email1, JSON.stringify(this.update), options)
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
    EdititemPage.prototype.Dismiss = function () {
        this.victrl.dismiss();
    };
    return EdititemPage;
}());
EdititemPage = __decorate([
    core_1.Component({
        selector: 'page-edititem',
        templateUrl: 'edititem.html'
    })
], EdititemPage);
exports.EdititemPage = EdititemPage;
