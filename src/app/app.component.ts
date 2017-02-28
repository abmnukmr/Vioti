import { Component } from '@angular/core';
import {Platform, IonicApp, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, Toast} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import {AuthPage} from "../pages/auth/auth";
import {SignupPage} from "../pages/signup/signup";
import {ForgotPage} from "../pages/forgot/forgot";
import { Diagnostic } from 'ionic-native';

@Component({
  templateUrl:'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  app:IonicApp;
  nav:NavController;
  constructor(platform: Platform) {


    platform.ready().then(() => {

      Diagnostic.isLocationEnabled()
        .then((isEnabled) => {
          if(isEnabled){
            console.log('Is available? ' + isEnabled);
           }
          else {
           Diagnostic.switchToLocationSettings();

           }})
        .catch((e)=> {
            console.error(e);

      });


      StatusBar.styleDefault();
      Splashscreen.hide();
    });




  }
}
