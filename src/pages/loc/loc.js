"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var searchloc_1 = require("../searchloc/searchloc");
/*
  Generated class for the Loc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LocPage = (function () {
    function LocPage(navCtrl, navprms, modalCtrl) {
        //this.tabBarElement=document.querySelector('#tabs ion-tabbar-section');
        this.navCtrl = navCtrl;
        this.navprms = navprms;
        this.modalCtrl = modalCtrl;
        this.address = this.navprms.get("address");
        this.latlng = this.navprms.get("Latlng");
        this.lt = JSON.parse(this.latlng);
        this.lati = this.lt.lat;
        this.long = this.lt.lng;
    }
    LocPage.prototype.showAddressModal = function () {
        var modal = this.modalCtrl.create(searchloc_1.SearchlocPage);
        /* let  me = this;
         modal.onDidDismiss(data => {
         this.address.place = data;
         });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    return LocPage;
}());
LocPage = __decorate([
    core_1.Component({
        selector: 'page-loc',
        templateUrl: 'loc.html'
    })
], LocPage);
exports.LocPage = LocPage;
//
