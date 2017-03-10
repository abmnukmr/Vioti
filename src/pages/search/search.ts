import {Component, NgZone} from '@angular/core';
import {NavController, ViewController, Searchbar, AlertController} from 'ionic-angular';

import {ViewChild} from "@angular/core/src/metadata/di";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'search.html',



})

export class SearchPage {
  @ViewChild('searchbar') searchbar:Searchbar;
   items:any;
   filtter:any;
   title:string='catagory';
  testRadioOpen: boolean;
  testRadioResult;
  searchTerm:string="";
  searchControl: FormControl;
  searching: any = false;
  constructor (public viewCtrl: ViewController, private zone: NgZone,public alertCtrl: AlertController) {
    this.searchControl = new FormControl();

    this.initializeItems();



  }

  showRadio() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Searchby');

    alert.addInput({
      type: 'radio',
      label: 'By catagory',
      value: 'catagory',
      checked: true
    });


    alert.addInput({
      type: 'radio',
      label: 'By Name',
      value: 'name',

    });

    alert.addInput({
      type: 'radio',
      label: 'By phone No.',
      value: 'phone'
    });

    alert.addInput({
      type: 'radio',
      label: 'By Email',
      value: 'email'
    });

    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.title=data;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });

  }


  initializeItems() {
    this.items = [
      {"name":"jgjdsg","catagory":"foodpoint","email":"abmnukmr@gmail.com"},

      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Rohit garments ","catagory":"sationary","email":"developer.abmnu@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},

      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Rohit garments  vibgyor  ","catagory":"sationary","email":"kkkkkkkk@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},

      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Rohit garments ","catagory":"sationary","email":"developer.abmnu@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"},
      {"name":"Goivind Paan Shop ","catagory":"paaan parag","email":"developer.abmnu@gmail.com"}








    ]

  }









  ionViewDidEnter() {
    setTimeout(()=>{
       console.log("Searchbar open")
      this.searchbar.setFocus();
    },2);


  }




  dismiss4() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {



    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;

    });


  }







  getItems(ev) {
    this.searching = true;
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items

    if(this.title=="catagory"){


    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
         this.filtter=this.title;
         console.log(this.filtter);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }
    }

    if(this.title=="name"){


      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          this.filtter=this.title;
          console.log(this.filtter);
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);


        })
      }
    }
    if(this.title=="email"){


      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          this.filtter=this.title;
          console.log(this.filtter);
          return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);


        })
      }
    }



  }




  ///////////////// map list




  applyHaversine(locations){

    let usersLocation = {
      lat: 40.713744,
      lng: -74.009056
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
    return x * Math.PI / 180;
  }











}
