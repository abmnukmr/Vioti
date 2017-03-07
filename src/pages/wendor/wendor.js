"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("firebase");
var ionic_native_1 = require("ionic-native");
var ionic_native_2 = require("ionic-native");
/*
  Generated class for the Wendor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var WendorPage = (function () {
    function WendorPage(navCtrl, toastCtrl, abmnu, loadingCtrl, alertCtrl, connectivityService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.abmnu = abmnu;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.connectivityService = connectivityService;
        this.showThis = false;
        this.col = false;
        this.col1 = false;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (resp) {
            _this.lati = resp.coords.latitude;
            _this.lngi = resp.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        this.loading = this.loadingCtrl.create({
            content: "Loading..."
        });
        this.load();
    }
    WendorPage.prototype.nevigate = function () {
        //31.7104269,76.5258813
        ionic_native_2.LaunchNavigator.navigate([this.wendor.lat, this.wendor.lng], {
            // start: 'this.lati,this.lngi'
            destinationName: this.wendor.name
        });
    };
    WendorPage.prototype.load = function () {
        var _this = this;
        if (this.connectivityService.isOnline()) {
            this.loading.present();
            var user = firebase.auth().currentUser;
            if (user != null) {
                var name = user.displayName;
                this.email = user.email;
                var photoUrl = user.photoURL;
            }
            //this.email="abmnukmr@gmail.com";
            this.abmnu.getReviews(this.email).then(function (data) {
                console.log(data);
                _this.wendor = data;
                _this.showThis = true;
                _this.loading.dismissAll();
                console.log("get");
                if (_this.wendor.status == "true") {
                    _this.col1 = false;
                    console.log("gettttttt");
                }
                else {
                    _this.col1 = true;
                }
            });
            console.log("error");
        }
        else {
            this.loading.dismissAll();
            var alert_1 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Internet Connectivity :(',
                buttons: [
                    {
                        text: 'Try Again',
                        handler: function () {
                            _this.load();
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    WendorPage.prototype.doRefresh = function (refresher) {
        this.load();
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return WendorPage;
}());
WendorPage = __decorate([
    core_1.Component({
        selector: 'page-wendor',
        templateUrl: 'wendor.html'
    })
], WendorPage);
exports.WendorPage = WendorPage;
