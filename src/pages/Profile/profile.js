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
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ProfilePage = (function () {
    function ProfilePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.transionpage = transition_1.TransitionPage;
        this.shop_name = "Abhimanyu IOT Enterprises";
        this.shop_location = "Braeley California";
        this.shop_contactemail = "abmnukmr@gmail.com";
        this.shop_contactphone = "+91 9625255416";
        this.shop_contactwhatsapp = " +92 9625255416";
        this.shop_discription = "Lora networks xbee, onion Omega, Raspberry Pi, Intel Edison, Arduino uno, Waio link, Intel galilio, Xbeee pro, Blynk CD";
    }
    return ProfilePage;
}());
ProfilePage = __decorate([
    core_1.Component({
        selector: 'page-profile',
        templateUrl: 'profile.html'
    })
], ProfilePage);
exports.ProfilePage = ProfilePage;
