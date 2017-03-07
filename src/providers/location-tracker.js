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
require("rxjs/add/operator/filter");
/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var LocationTracker = (function () {
    function LocationTracker(zone) {
        this.zone = zone;
        this.lat = 0;
        this.lng = 0;
    }
    LocationTracker.prototype.startTracking = function () {
        // Background Tracking
        var _this = this;
        var config = {
            frequency: 500,
            desiredAccuracy: 20,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 10
        };
        ionic_native_1.BackgroundGeolocation.configure(function (location) {
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            // Run update inside of Angular's zone
            _this.zone.run(function () {
                _this.lat = location.latitude;
                _this.lng = location.longitude;
            });
        }, function (err) {
            console.log(err);
        }, config);
        // Turn ON the background-geolocation system.
        ionic_native_1.BackgroundGeolocation.start();
        // Foreground Tracking
        var options = {
            frequency: 500,
            enableHighAccuracy: true
        };
        this.watch = ionic_native_1.Geolocation.watchPosition(options).filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            console.log(position);
            // Run update inside of Angular's zone
            _this.zone.run(function () {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
            });
        });
    };
    LocationTracker.prototype.stopTracking = function () {
        console.log('stopTracking');
        ionic_native_1.BackgroundGeolocation.finish();
        this.watch.unsubscribe();
    };
    return LocationTracker;
}());
LocationTracker = __decorate([
    core_1.Injectable()
], LocationTracker);
exports.LocationTracker = LocationTracker;
