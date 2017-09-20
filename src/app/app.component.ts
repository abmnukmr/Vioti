import { Component } from '@angular/core';
import {Platform, IonicApp, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, Toast} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Diagnostic } from 'ionic-native';
import {LocationTracker} from "../providers/location-tracker";
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import {WendorPage} from "../pages/wendor/wendor";
import {isUndefined} from "ionic-angular/umd/util/util";
@Component({
  templateUrl:'app.html'
})
export class MyApp {
  link:any;
  rootPage=TabsPage;
  app:IonicApp;
  nav:NavController;
  constructor(platform: Platform,public location:LocationTracker,public push: Push)
  {
    this.location.startTracking();
    platform.ready().then(() => {


      Diagnostic.isLocationEnabled()
        .then((isEnabled) => {
          if(isEnabled){
            console.log('Is available? ' + isEnabled);
            this.rootPage=TabsPage;

          }
          else {
           Diagnostic.switchToLocationSettings();
         //   this.location.startTracking();



          }})
        .catch((e)=> {
            console.error(e);

      });
      StatusBar.overlaysWebView(true); // let status bar overlay webview

      StatusBar.backgroundColorByHexString('#cb1b58');

    //  StatusBar.styleDefault();
      Splashscreen.hide();



    });




  }
}
