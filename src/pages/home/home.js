"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var transition_1 = require("../transition/transition");
var profile_1 = require("../Profile/profile");
var search_1 = require("../search/search");
var wendor_1 = require("../wendor/wendor");
var fiter_1 = require("../fiter/fiter");
var ionic_native_1 = require("ionic-native");
var choosloc_1 = require("../choosloc/choosloc");
var loc_1 = require("../loc/loc");
var firebase_1 = require("firebase");
var auth_1 = require("../auth/auth");
var ionic_native_2 = require("ionic-native");
var barcoderead_1 = require("../barcoderead/barcoderead");
//import {Auth, User, GoogleAuth} from '@ionic/cloud-angular';
var HomePage = (function () {
    function HomePage(authService, alertCtrl, toastCtrl, navCtrl, platform, zone, _abmnu, locationTracker, menuCtrl, modalCtrl) {
        var _this = this;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.zone = zone;
        this._abmnu = _abmnu;
        this.locationTracker = locationTracker;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.choosloc = choosloc_1.ChooslocPage;
        this.transitionpage = transition_1.TransitionPage;
        this.search = search_1.SearchPage;
        this.loc = loc_1.LocPage;
        this.profile = profile_1.ProfilePage;
        this.wendor = wendor_1.WendorPage;
        this.show2 = false;
        this.showadd();
        firebase_1.default.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.emailVerified) {
                }
                else {
                    navCtrl.push(auth_1.AuthPage);
                    _this.presentToast("Please verify your account by sent verfication link to your email");
                }
            }
            else {
                navCtrl.push(auth_1.AuthPage);
            }
        });
        //
    }
    HomePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 6000,
            position: 'top'
        });
        toast.present();
    };
    HomePage.prototype.scan = function () {
        // BarcodeScanner.scan().then((barcodeData) => {
        var _this = this;
        this.platform.ready().then(function () {
            ionic_native_2.BarcodeScanner.scan().then(function (result) {
                _this.data = JSON.parse(result.text);
                //   alert(this.data.shopemail);
                _this.navCtrl.push(barcoderead_1.BarcodereadPage, { email1: _this.data.shopemail });
            }, function (err) {
            });
        });
    };
    HomePage.prototype.onPageLoaded = function () {
        this.showadd();
        this.locationTracker.startTracking();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        firebase_1.default.auth().onAuthStateChanged(function (user) {
            if (user) {
            }
            else {
                this.navCtrl.pop(auth_1.AuthPage);
            }
        });
        this.showadd();
        this.locationTracker.startTracking();
    };
    /*  logout() {
        this.googleAuth.logout();
    
        console.log("addddjhjgjgj");
        this.navCtrl.pop(AuthPage);
    
      }*/
    HomePage.prototype.dologout = function () {
        this.authService.doLogout();
    };
    HomePage.prototype.showAddressModal = function () {
        var modal = this.modalCtrl.create(search_1.SearchPage);
        /* let  me = this;
        modal.onDidDismiss(data => {
          this.address.place = data;
        });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    HomePage.prototype.showmap = function () {
        var modal = this.modalCtrl.create(choosloc_1.ChooslocPage);
        /* let  me = this;
         modal.onDidDismiss(data => {
         this.address.place = data;
         });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    HomePage.prototype.showFilter = function () {
        var modal = this.modalCtrl.create(fiter_1.FiterPage);
        /* let  me = this;
         modal.onDidDismiss(data => {
         this.address.place = data;
         });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    HomePage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    HomePage.prototype.showadd = function () {
        var _this = this;
        var location = new ionic_native_1.GoogleMapsLatLng(this.locationTracker.lat, this.locationTracker.lng);
        var request = {
            position: location,
            componentRestrictions: {
                country: 'IN'
            }
        };
        //  let location = new GoogleMapsLatLng(28.5272181,77.0688997);
        this.platform.ready().then(function () {
            ionic_native_1.Geocoder.geocode(request).then(function (res) {
                if (res.length) {
                    _this.zone.run(function () {
                        var result = res[0];
                        var position = result.position;
                        // var addresss="fatuha"
                        _this.address = [
                            result.postalCode || "",
                            result.country
                        ].join(" ");
                    });
                }
            });
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    })
], HomePage);
exports.HomePage = HomePage;
