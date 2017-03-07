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
/*
  Generated class for the Focuser directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
var Focuser = (function () {
    function Focuser(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    Focuser.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.elementRef.nativeElement.querySelector('input');
        // we need to delay our call in order to work with ionic ...
        setTimeout(function () {
            _this.renderer.invokeElementMethod(element, 'focus', []);
            ionic_native_1.Keyboard.show();
        }, 0);
    };
    return Focuser;
}());
Focuser = __decorate([
    core_1.Directive({
        selector: '[focuser]' // Attribute selector
    })
], Focuser);
exports.Focuser = Focuser;
