
import {Component, NgZone} from '@angular/core';
import {NavController, ViewController, Searchbar, AlertController} from 'ionic-angular';

import {ViewChild} from "@angular/core/src/metadata/di";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {Shopdata} from "../../providers/shopdata";
import { Geolocation } from 'ionic-native';
import {LocationTracker} from "../../providers/location-tracker";
import {WendorPage} from "../wendor/wendor";
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
  iname:any="";
  searchTerm:string="";
  searchControl: FormControl;
  spinshow:boolean=false;
  listshow:boolean=false;
  searching: any = false;
  _fitdata:any;
  _lat:any;

  _lng:any;
  constructor (public navCtrl: NavController,public viewCtrl: ViewController, private zone: NgZone,public alertCtrl: AlertController,public _shopdata:Shopdata,public locationTracker: LocationTracker) {
    this.searchControl = new FormControl();
     this.load(locationTracker.lat,locationTracker.lng);
    this.initializeItems();






  }

  showRadio() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Search by');

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
        this.testRadioOpen =true;
        this.title=data;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });

  }


  load(lat,lng) {

     console.log("gjgjh");
    this._shopdata.load(lat,lng).then((data) => {
      console.log(data);
      this.spinshow=true;
      this._fitdata =data;
     // console.log(this.items);
      console.log("callback"+JSON.stringify(data));

       return this._fitdata;
    });

///    this.items =[{"name":"Abhimanyu Interpric","address":"California, USA","profileimage":"https://vioti.s3.amazonaws.com/1489231269432image.jpg","whatsapp":"+91 9625255416","phone":"91 9625255416","catagory":"Breakery & sweet store","lat":31.712002509892525,"lng":76.52625798438149,"email":"developer.abmnu@gmail.com","discription":"My shop having all type of electronics and all type of mechanical design\nfhgd\ndhhf\nfjjghhcghv\nvhjbv\nfhjh","visits":"20000000","status":"false","distance":"534.24"},{"name":"Georgian","address":"US","profileimage":"https://vioti.s3.amazonaws.com/1488987835479image.jpg","whatsapp":"+91 9625255416vgx","phone":"+91 9625255416","catagory":"coffee shop","lat":31.7101933,"lng":76.5269653,"email":"abmnukmr@gmail.com","discription":"My shop having all type of electronics and all type of mechanical design\nfhgd\ndhhf\nfjjghhcghv\nvhjbv\nfhjh","visits":"20000000","status":"false","distance":"534.45"}]

    //console.log("bmbm"+JSON.stringify(data));


  }


  initializeItems(){

      this.items=this._fitdata;
  }






  ionViewDidEnter() {

    this.load(this.locationTracker.lat,this.locationTracker.lng);

    setTimeout(()=>{
       console.log("Searchbar open")
      this.searchbar.setFocus();
    },2);


  }

  goto(email){
    this.navCtrl.push(WendorPage,{"email":email});
  }



  dismiss4() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {

    this.load(this.locationTracker.lat,this.locationTracker.lng);

    this.searchControl.valueChanges.debounceTime(300).subscribe(search => {
      this.searching = false;

    });


  }





  getItems(ev) {
    this.searching = true;
    // Reset items back to all of the items
    this.initializeItems();
   this.listshow=true;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items



    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
         this.filtter=this.title;
         console.log(this.filtter);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }




  }




  ///////////////// map list










}
