"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
/*
  Generated class for the Abmnu provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Abmnu = (function () {
    function Abmnu(http, zone) {
        this.http = http;
        this.zone = zone;
        //   this.getReviews(id);
        console.log('Hello Abmnu Provider');
    }
    Abmnu.prototype.getReviews = function (id) {
        var _this = this;
        if (this.data) {
            console.log("g");
            // return Promise.resolve(this.data);
            return new Promise(function (resolve) {
                _this.http.get('https://vioti.herokuapp.com/profile/' + id)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                    //console.log(data);
                    console.log("reloded");
                }, function (err) {
                    console.log("Oops!");
                });
            });
        }
        return new Promise(function (resolve) {
            _this.http.get('https://vioti.herokuapp.com/profile/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
                //console.log(data);
                console.log("ghdgggg");
            }, function (err) {
                //          this.data={"error":"error"};
                console.log("Oops");
                //  return this.errror=2;
            }, function () {
                console.log("Done");
                //              errror=2;
                //return this.errror=2;
            });
        });
    };
    return Abmnu;
}());
Abmnu = __decorate([
    core_1.Injectable()
], Abmnu);
exports.Abmnu = Abmnu;
