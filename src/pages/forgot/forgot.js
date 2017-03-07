"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var auth_1 = require("../auth/auth");
/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ForgotPage = (function () {
    function ForgotPage(navCtrl, authService, navParams, formBuilder, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.submitAttempt = false;
        //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.resetpwdForm = formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required])]
        });
    }
    ForgotPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    ForgotPage.prototype.resetPwd = function () {
        var _this = this;
        if (!this.resetpwdForm.valid) {
            console.log(this.resetpwdForm.value);
        }
        else {
            this.authService.resetPassword(this.resetpwdForm.value.email).then(function (authService) {
                _this.navCtrl.setRoot(auth_1.AuthPage);
                _this.loading.dismiss();
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
    };
    return ForgotPage;
}());
ForgotPage = __decorate([
    core_1.Component({
        selector: 'page-forgot',
        templateUrl: 'forgot.html'
    })
], ForgotPage);
exports.ForgotPage = ForgotPage;
