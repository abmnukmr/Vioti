"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var titleeditor_1 = require("../titleeditor/titleeditor");
var titlecontact_1 = require("../titlecontact/titlecontact");
var titlediscription_1 = require("../titlediscription/titlediscription");
var titleitem_1 = require("../titleitem/titleitem");
var additem_1 = require("../additem/additem");
var shopopen_1 = require("../shopopen/shopopen");
var http_1 = require("@angular/http");
var firebase = require("firebase/app");
var edititem_1 = require("../edititem/edititem");
var profilephoto_1 = require("../profilephoto/profilephoto");
var qrcode_1 = require("../qrcode/qrcode");
var onemore_1 = require("../onemore/onemore");
var locationedit_1 = require("../locationedit/locationedit");
/*
  Generated class for the Wallet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var WalletPage = (function () {
    function WalletPage(loadingCtrl, http, alertCtrl, connectivityService, navCtrl, abmnu, actionsheetCtrl, platform, modalCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.connectivityService = connectivityService;
        this.navCtrl = navCtrl;
        this.abmnu = abmnu;
        this.actionsheetCtrl = actionsheetCtrl;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.showThis = false;
        this.open = false;
        this.shopopen = shopopen_1.ShopopenPage;
        this.loading = this.loadingCtrl.create({
            content: "wait..."
        });
        //this.abmnu.errror
        console.log('wallet init');
        // console.log(this.abmnu.errror);
        this.loading.present();
        this.getReviews();
    }
    WalletPage.prototype.getReviews = function () {
        var _this = this;
        if (this.connectivityService.isOnline()) {
            var user = firebase.auth().currentUser;
            if (user != null) {
                var name = user.displayName;
                this.email1 = user.email;
                var photoUrl = user.photoURL;
            }
            if (this.data) {
                console.log("g");
                // return Promise.resolve(this.data);
                return new Promise(function (resolve) {
                    _this.http.get('https://vioti.herokuapp.com/profile/' + _this.email1)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this.data = data;
                        resolve(_this.data);
                        //console.log(data);
                        _this.wendor = data;
                        _this.showThis = true;
                        _this.open = false;
                        _this.loading.dismissAll();
                        console.log("reloded");
                    }, function (err) {
                        _this.showThis = false;
                        _this.open = true;
                        console.log("data not matched");
                        _this.loading.dismissAll();
                        console.log("Oops!");
                    });
                });
            }
            return new Promise(function (resolve) {
                _this.http.get('https://vioti.herokuapp.com/profile/' + _this.email1)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                    _this.wendor = data;
                    _this.showThis = true;
                    _this.open = false;
                    _this.loading.dismissAll();
                    //console.log(data);
                    console.log("ghdgggg");
                }, function (err) {
                    //
                    //      this.data={"error":"error"};
                    _this.showThis = false;
                    _this.open = true;
                    console.log("data not matched");
                    _this.loading.dismissAll();
                    console.log("Oops");
                    //  return this.errror=2;
                }, function () {
                    console.log("Done");
                    //              errror=2;
                    //return this.errror=2;
                });
            });
        }
        else {
            this.loading.dismissAll();
            var alert_1 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'No Internet Connectivity..',
                buttons: [
                    {
                        text: 'Try Again',
                        handler: function () {
                            _this.getReviews();
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    WalletPage.prototype.openMenu = function (id, itemname, itemno, itemdiscription, itemprice) {
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Edit',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'md-create' : null,
                    handler: function () {
                        _this.edit(id, itemname, itemno, itemdiscription, itemprice);
                        // console.log('Delete clicked');
                    }
                },
                {
                    text: 'Delete',
                    icon: !this.platform.is('ios') ? 'md-trash' : null,
                    handler: function () {
                        _this.showConfirm(id);
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Add one more image',
                    icon: !this.platform.is('ios') ? 'md-image' : null,
                    handler: function () {
                        _this.addonemore(id);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    WalletPage.prototype.doRefresh = function (refresher) {
        this.getReviews();
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    WalletPage.prototype.showConfirm = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you sure?',
            message: 'this item will be remove from you list item',
            buttons: [
                {
                    text: 'cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.deleteReview(id);
                    }
                }
            ]
        });
        confirm.present();
    };
    WalletPage.prototype.deleteReview = function (id) {
        var _this = this;
        this.http.get('https://vioti.herokuapp.com/profile/email/' + this.email1 + '/delete/' + id).subscribe(function (res) {
            console.log(res.json());
            var index = _this.wendor.item.indexOf(_this.wendor.item);
            _this.wendor.item.splice(id, 1);
            setTimeout(function () {
                console.log('Async operation has ended');
                _this.getReviews();
            }, 2000);
        });
        this.getReviews();
    };
    WalletPage.prototype.edit = function (id, itemname, itemno, itemdiscription, itemprice) {
        var _this = this;
        var modal = this.modalCtrl.create(edititem_1.EdititemPage, { item_name: itemname, item_no: itemno, item_price: itemprice, item_discription: itemdiscription, _id: id });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.placeedit = function () {
        var _this = this;
        var modal = this.modalCtrl.create(locationedit_1.LocationeditPage);
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.addonemore = function (id) {
        var _this = this;
        var modal = this.modalCtrl.create(onemore_1.OnemorePage, { _id: id });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.openeditor = function () {
        var _this = this;
        var modal = this.modalCtrl.create(titleeditor_1.TitleeditorPage, { shopname: this.wendor.name, shoplocation: this.wendor.address, shopcata: this.wendor.catagory });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.togglechage = function () {
        var user = firebase.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            this.email1 = user.email;
            var photoUrl = user.photoURL;
        }
        var statuss = this.wendor.status;
        if (statuss == "true") {
            this.finalstatus = "false";
        }
        else {
            this.finalstatus = "true";
        }
        console.log(this.finalstatus);
        var sttatus = {
            status: this.finalstatus
        };
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('https://vioti.herokuapp.com/profile/upload/email/status/' + this.email1, JSON.stringify(sttatus), options)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("Error!:", err.json());
        });
        this.getReviews();
    };
    WalletPage.prototype.openbarcode = function () {
        var _this = this;
        var modal = this.modalCtrl.create(qrcode_1.QrcodePage, { shopname: this.wendor.name, shopimage: this.wendor.profileimage, shopcata: this.wendor.catagory });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.profilepc = function () {
        var _this = this;
        var modal = this.modalCtrl.create(profilephoto_1.ProfilephotoPage);
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.opencontact = function () {
        var _this = this;
        var modal = this.modalCtrl.create(titlecontact_1.TitlecontactPage, { shopcontactemail: this.wendor.email, shopcontactphone: this.wendor.phone, shopcontactwhatsapp: this.wendor.whatsapp });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.opendiscription = function () {
        var _this = this;
        var modal = this.modalCtrl.create(titlediscription_1.TitlediscriptionPage, { shopdiscription: this.wendor.discription });
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.openitem = function () {
        var _this = this;
        var modal = this.modalCtrl.create(titleitem_1.TitleitemPage);
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    WalletPage.prototype.additem = function () {
        var _this = this;
        var modal = this.modalCtrl.create(additem_1.AdditemPage);
        modal.present();
        modal.onDidDismiss(function () {
            _this.getReviews();
        });
    };
    return WalletPage;
}());
WalletPage = __decorate([
    core_1.Component({
        selector: 'page-wallet',
        templateUrl: 'wallet.html'
    })
], WalletPage);
exports.WalletPage = WalletPage;
