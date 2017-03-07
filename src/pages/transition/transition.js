"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var profile_1 = require("../Profile/profile");
var di_1 = require("@angular/core/src/metadata/di");
var TransitionPage = (function () {
    function TransitionPage(navCtrl, connectivityService, navParams) {
        // this.loadGoogleMaps();
        this.navCtrl = navCtrl;
        this.connectivityService = connectivityService;
        this.navParams = navParams;
        this.profile = profile_1.ProfilePage;
        this.pet = "map";
        this.mapInitialised = false;
    }
    return TransitionPage;
}());
__decorate([
    di_1.ViewChild('map_canvas')
], TransitionPage.prototype, "mapElement", void 0);
__decorate([
    di_1.ViewChild('map_canvas2')
], TransitionPage.prototype, "mapElement24", void 0);
TransitionPage = __decorate([
    core_1.Component({
        selector: 'page-transition',
        templateUrl: 'transition.html'
    })
], TransitionPage);
exports.TransitionPage = TransitionPage;
