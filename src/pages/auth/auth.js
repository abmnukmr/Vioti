"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tabs_1 = require("../tabs/tabs");
var signup_1 = require("../signup/signup");
var forms_1 = require("@angular/forms");
var forgot_1 = require("../forgot/forgot");
var ionic_native_1 = require("ionic-native");
var firebase_1 = require("firebase");
/*
 Generated class for the Auth page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var AuthPage = (function () {
    function AuthPage(googleAuth, navCtrl, modalCtrl, af, toastCtrl, alertController, platform, authService, navParams, formBuilder, alertCtrl, loadingCtrl) {
        this.googleAuth = googleAuth;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.af = af;
        this.toastCtrl = toastCtrl;
        this.alertController = alertController;
        this.platform = platform;
        this.authService = authService;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.forgot = forgot_1.ForgotPage;
        this.signup = signup_1.SignupPage;
        this.userProfile = null;
        //    let EMAIL_REGEXP ='/^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i';
        this.loginForm = formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.minLength(6), forms_1.Validators.required])]
        });
        this.fireAuth = firebase_1.default.auth();
        this.verfy();
    }
    AuthPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    AuthPage.prototype.googlePlusLogin = function () {
        var _this = this;
        this.af.auth.subscribe(function (data) {
            _this.af.auth.unsubscribe();
            console.log("in auth subscribe", data);
            _this.platform.ready().then(function () {
                ionic_native_1.GooglePlus.login({
                    'webClientId': '553959685910-2ipcgm9ei606n9tbglevlscv8s056tdt.apps.googleusercontent.com'
                })
                    .then(function (userData) {
                    console.log("userData " + JSON.stringify(userData));
                    console.log("firebase " + firebase_1.default);
                    var provider = _this.fireAuth.GoogleAuthProvider.credential(userData.idToken);
                    firebase_1.default.auth().signInWithCredential(provider)
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        _this.displayAlert(JSON.stringify(success), "signInWithCredential successful");
                        _this.userProfile = success;
                    })
                        .catch(function (error) {
                        console.log("Firebase failure: " + JSON.stringify(error));
                        _this.displayAlert(error, "signInWithCredential failed");
                    });
                })
                    .catch(function (gplusErr) {
                    console.log("GooglePlus failure: " + JSON.stringify(gplusErr));
                    _this.displayAlert(JSON.stringify(gplusErr), "GooglePlus failed");
                });
            });
        });
    };
    AuthPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 6000,
            position: 'top'
        });
        toast.present();
    };
    AuthPage.prototype.displayAlert = function (value, title) {
        var coolAlert = this.alertController.create({
            title: title,
            message: JSON.stringify(value),
            buttons: [
                {
                    text: "OK"
                }
            ]
        });
        coolAlert.present();
    };
    AuthPage.prototype.register = function () {
        var modal = this.modalCtrl.create(signup_1.SignupPage);
        /* let  me = this;
         modal.onDidDismiss(data => {
         this.address.place = data;
         });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    AuthPage.prototype.resetPwd = function () {
        var modal = this.modalCtrl.create(forgot_1.ForgotPage);
        /* let  me = this;
         modal.onDidDismiss(data => {
         this.address.place = data;
         });*/
        // modal.present(modal);
        console.log("modal not working");
        modal.present();
    };
    AuthPage.prototype.googlrlogin = function () {
        var _this = this;
        this.googleAuth.login().then(function (success) {
            _this.navCtrl.push(tabs_1.TabsPage);
        });
    };
    AuthPage.prototype.verfy = function () {
        firebase_1.default.auth().onAuthStateChanged(function (user) {
            if (user.emailVerified) {
                this.verified = true;
                console.log('Email is verified');
            }
            else {
                this.verified = false;
                console.log('Email is not verified');
            }
        });
    };
    AuthPage.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then(function (authService) {
                firebase_1.default.auth().onAuthStateChanged(function (user) {
                    if (user.emailVerified) {
                        _this.navCtrl.pop(tabs_1.TabsPage);
                        console.log('Email is verified');
                    }
                    else {
                        _this.verified = false;
                        _this.presentToast("Please verify your account by sent verfication link to your email");
                        console.log('Email is not verified');
                    }
                });
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
    return AuthPage;
}());
AuthPage = __decorate([
    core_1.Component({
        selector: 'page-auth',
        templateUrl: 'auth.html'
    })
], AuthPage);
exports.AuthPage = AuthPage;
