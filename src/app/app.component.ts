import { Component } from '@angular/core';
import {Platform, IonicApp, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, Toast} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import {AuthPage} from "../pages/auth/auth";
import {SignupPage} from "../pages/signup/signup";
import {ForgotPage} from "../pages/forgot/forgot";

@Component({
  templateUrl:'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  app:IonicApp;
  nav:NavController;
  constructor(platform: Platform) {


    platform.ready().then(() => {


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });




  }
}
