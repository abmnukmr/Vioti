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
var ionic_native_2 = require("ionic-native");
var loc_1 = require("../loc/loc");
/*
  Generated class for the Choosloc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ChooslocPage = (function () {
    function ChooslocPage(navCtrl, victrl, platform, zone, location) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.victrl = victrl;
        this.platform = platform;
        this.zone = zone;
        this.location = location;
        this.listshow = true;
        this.show = true;
        this.service = new google.maps.places.AutocompleteService();
        platform.ready().then(function () {
            _this.loadMap();
        });
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
    ChooslocPage.prototype.updateSearch = function () {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: 'IN' } }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction.description);
                });
            });
        });
    };
    ChooslocPage.prototype.dismiss4 = function () {
        this.victrl.dismiss();
    };
    ChooslocPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
        this.loadMap();
    };
    ChooslocPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
        // this.navCtrl.pop();
    };
    ChooslocPage.prototype.chooseItem = function (item) {
        var _this = this;
        this.autocomplete.query = item;
        this.autocompleteItems = [];
        this.showadd(this.autocomplete.query);
        ionic_native_2.Keyboard.close();
        var markerOptions = {};
        this.map5.addMarker(markerOptions)
            .then(function (marker) {
            if (marker != null) {
                _this.map5.clear();
            }
            marker.showInfoWindow();
        });
    };
    ChooslocPage.prototype.loadMap = function () {
        var location = new ionic_native_1.GoogleMapsLatLng(28.5272181, 77.0688997);
        this.map5 = new ionic_native_1.GoogleMap('map2', {
            'backgroundColor': 'white',
            'controls': {
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 5,
                'bearing': 50
            }
        });
        this.map5.setPadding(150, 0, 0, 0);
        this.map5.setMyLocationEnabled(true);
        this.map5.setCompassEnabled(true);
        this.map5.on(ionic_native_1.GoogleMapsEvent.MAP_READY).subscribe(function () {
            console.log('Map is ready!');
        });
    };
    ChooslocPage.prototype.showloc = function () {
        var position = new ionic_native_1.GoogleMapsLatLng(this.location.lat, this.location.lng);
        this.map5.moveCamera(position);
        this.map5.animateCamera({
            'target': position,
            'zoom': 18
        });
        console.log("show laoction");
    };
    ChooslocPage.prototype.maptype = function () {
        this.map5.setMapTypeId("SATELLITE");
    };
    ChooslocPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ChooslocPage.prototype.showadd = function (item) {
        var _this = this;
        this.platform.ready().then(function () {
            ionic_native_1.Geocoder.geocode({ 'address': item }).then(function (res) {
                if (res.length) {
                    var result = res[0];
                    var position = result.position;
                    _this.ltlng = JSON.stringify(result.position);
                    _this.map5.moveCamera(position);
                    _this.map5.animateCamera({
                        'target': position,
                        'zoom': 18
                    });
                    var markerOptions = {
                        position: position,
                        title: item
                    };
                    if (_this.marker != null) {
                        _this.map5.clear();
                    }
                    else {
                        _this.map5.addMarker(markerOptions)
                            .then(function (marker) {
                            marker.showInfoWindow();
                            marker.setPosition(position);
                        });
                    }
                }
            });
        });
    };
    ChooslocPage.prototype.save = function () {
        this.navCtrl.push(loc_1.LocPage, { address: this.autocomplete.query, Latlng: this.ltlng });
    };
    return ChooslocPage;
}());
ChooslocPage = __decorate([
    core_1.Component({
        selector: 'page-choosloc',
        templateUrl: 'choosloc.html'
    })
], ChooslocPage);
exports.ChooslocPage = ChooslocPage;
