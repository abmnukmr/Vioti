import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';
import {TransitionPage} from "../transition/transition";
import {LocationTracker} from "../../providers/location-tracker";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 transitionpage=TransitionPage
  title: string = 'My first angular2-google-maps project';
  items:any;
  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }
    initializeItems() {
      this.items = [
        {title: 'one jkjk',"go":"fhfhgf"},
        {title: 'two',"go":"fhfbhghhgf"},
        {title: 'three',"go":"fhggfhgf"},
        {title: 'four',"go":"fhfddddddddddddhgf"},
        {title: 'five',"go":"fhfhgf"},
        {title: 'six',"go":"fhfhgf"},
        {title: 'two',"go":"fhfbhghhgf"},
        {title: 'three',"go":"fhggfhgf"},
        {title: 'four',"go":"fhfddddddddddddhgf"},
        {title: 'five',"go":"fhfhgf"},
        {title: 'six',"go":"fhfhgf"}, {title: 'two',"go":"fhfbhghhgf"},
        {title: 'three',"go":"fhggfhgf"},
        {title: 'four',"go":"fhfddddddddddddhgf"},
        {title: 'five',"go":"fhfhgf"},
        {title: 'six',"go":"fhfhgf"}, {title: 'two',"go":"fhfbhghhgf"},
        {title: 'three',"go":"fhggfhgf"},
        {title: 'four',"go":"fhfddddddddddddhgf"},
        {title: 'five',"go":"fhfhgf"},
        {title: 'six',"go":"fhfhgf"}

      ];
    }

    getItems(ev) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }
