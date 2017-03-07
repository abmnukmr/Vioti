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
var firebase = require("firebase/app");
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SignupPage = (function () {
    function SignupPage(navCtrl, toastCtrl, authService, navParams, formBuilder, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.fullnameChanged = false;
        this.submitAttempt = false;
        this.registerForm = formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.minLength(6), forms_1.Validators.required])],
            fullname: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            phone: ['', forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.required])],
        });
    }
    SignupPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    SignupPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 6000,
            position: 'top'
        });
        toast.present();
    };
    SignupPage.prototype.doRegister = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.registerForm.valid) {
            console.log(this.registerForm.value);
        }
        else {
            this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.phone, this.registerForm.value.fullname).then(function (authService) {
                firebase.auth().onAuthStateChanged(function (user) {
                    user.sendEmailVerification();
                });
                _this.presentToast("Verfication mail sent Successfully. Verify your account");
                _this.navCtrl.pop(auth_1.AuthPage);
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
    return SignupPage;
}());
SignupPage = __decorate([
    core_1.Component({
        selector: 'page-signup',
        templateUrl: 'signup.html'
    })
], SignupPage);
exports.SignupPage = SignupPage;
