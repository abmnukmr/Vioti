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
var firebase_1 = require("firebase");
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Auth = (function () {
    function Auth(toastCtrl) {
        this.toastCtrl = toastCtrl;
        this.fireAuth = firebase_1.default.auth();
        this.userData = firebase_1.default.database().ref('/userProfile');
    }
    Auth.prototype.doLogin = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    Auth.prototype.register = function (email, password, phone, name) {
        var _this = this;
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            _this.userData.child(newUser.uid).set({ email: email, phone: phone, name: name });
        });
    };
    Auth.prototype.resetPassword = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    Auth.prototype.doLogout = function () {
        return this.fireAuth.signOut();
    };
    Auth.prototype.authgoogle = function () {
        var provider = new firebase_1.default.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase_1.default.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
        });
    };
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable()
], Auth);
exports.Auth = Auth;
