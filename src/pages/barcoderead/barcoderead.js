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
/*
  Generated class for the Barcoderead page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var BarcodereadPage = (function () {
    function BarcodereadPage(navCtrl, navParams, abmnu, loadingCtrl, alertCtrl, connectivityService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.abmnu = abmnu;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.connectivityService = connectivityService;
        this.showThis = false;
        this.col = false;
        this.col1 = false;
        this.loading = this.loadingCtrl.create({
            content: "Loading..."
        });
        this.load();
    }
    BarcodereadPage.prototype.load = function () {
        var _this = this;
        if (this.connectivityService.isOnline()) {
            this.loading.present();
            this.email = this.navParams.get("email1");
            //this.email="abmnukmr@gmail.com";
            this.abmnu.getReviews(this.email).then(function (data) {
                console.log(data);
                _this.wendor = data;
                _this.showThis = true;
                _this.loading.dismissAll();
                console.log("get");
                if (_this.wendor.status == "true") {
                    _this.col = true;
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
    BarcodereadPage.prototype.nevigate = function () {
        //31.7104269,76.5258813
        ionic_native_1.LaunchNavigator.navigate([this.wendor.lat, this.wendor.lng], {
            // start: 'this.lati,this.lngi'
            //      this.name=;
            destinationName: this.wendor.name
        });
    };
    BarcodereadPage.prototype.doRefresh = function (refresher) {
        this.load();
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return BarcodereadPage;
}());
BarcodereadPage = __decorate([
    core_1.Component({
        selector: 'page-barcoderead',
        templateUrl: 'barcoderead.html'
    })
], BarcodereadPage);
exports.BarcodereadPage = BarcodereadPage;
