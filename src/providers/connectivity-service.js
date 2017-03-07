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
var ConnectivityService = (function () {
    function ConnectivityService(platform) {
        this.platform = platform;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityService.prototype.isOnline = function () {
        if (this.onDevice && ionic_native_1.Network.connection) {
            return ionic_native_1.Network.connection !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityService.prototype.isOffline = function () {
        if (this.onDevice && ionic_native_1.Network.connection) {
            return ionic_native_1.Network.connection === Connection.NONE;
        }
        else {
            return !navigator.onLine;
        }
    };
    return ConnectivityService;
}());
ConnectivityService = __decorate([
    core_1.Injectable()
], ConnectivityService);
exports.ConnectivityService = ConnectivityService;
