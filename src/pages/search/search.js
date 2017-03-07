"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var di_1 = require("@angular/core/src/metadata/di");
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SearchPage = (function () {
    //  show2:any=false;
    //autocompleteItems;
    //autocomplete;
    //service = new google.maps.places.AutocompleteService();
    function SearchPage(viewCtrl, zone) {
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        // this.autocompleteItems = [];
        // this.autocomplete = {
        //  query: ''
        //};
    }
    SearchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            console.log("Searchbar open");
            _this.searchbar.setFocus();
        }, 2);
    };
    SearchPage.prototype.dismiss4 = function () {
        this.viewCtrl.dismiss();
    };
    return SearchPage;
}());
__decorate([
    di_1.ViewChild('searchbar')
], SearchPage.prototype, "searchbar", void 0);
SearchPage = __decorate([
    core_1.Component({
        templateUrl: 'search.html',
    })
], SearchPage);
exports.SearchPage = SearchPage;
