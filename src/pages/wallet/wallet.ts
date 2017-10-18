import {Component, ViewChild} from '@angular/core';
import {
  NavController, ActionSheetController, Platform, ToolbarItem, ModalController, Loading,
  LoadingController, Alert, AlertController, ToastController, Toggle
} from 'ionic-angular';
import {TitleeditorPage} from "../titleeditor/titleeditor";
import {TitlecontactPage} from "../titlecontact/titlecontact";
import {TitlediscriptionPage} from "../titlediscription/titlediscription";
import {TitleitemPage} from "../titleitem/titleitem";
import {AdditemPage} from "../additem/additem";
import {Abmnu} from "../../providers/abmnu";
import {OrderByPipe} from "../pipes/order-by-pipe";
import {ShopopenPage} from "../shopopen/shopopen";
import {Http, RequestOptions, Headers} from "@angular/http";
import {ConnectivityService} from "../../providers/connectivity-service";
import * as firebase from "firebase/app";
import {EdititemPage} from "../edititem/edititem";
import {ProfilephotoPage} from "../profilephoto/profilephoto";
import {QrcodePage} from "../qrcode/qrcode";
import {OnemorePage} from "../onemore/onemore";
import {LocationeditPage} from "../locationedit/locationedit";
import {PhoneverPage} from "../phonever/phonever";
import {ShopdetPage} from "../shopdet/shopdet";
import {AphoneverPage} from "../aphonever/aphonever";
import {LocationTracker} from "../../providers/location-tracker";
import { PhotoViewer } from 'ionic-native';

/*
  Generated class for the Wallet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  data: any;
  refreshIntervalId:any;
  finalstatus:string;
  finalstatuss:string;
  email1:any;
  items:any;
  grip:any;
  iname:any="";
  filtter:any;
  sttatus:any;
  update2:any;
  tog:boolean;
  wendor:any;
  item_name:any;
  item_no:any;
  item_discription:any;
  icon:any;
  spinshow:boolean=false;
  phonever=PhoneverPage;
  item_price:any;
  showThis:boolean=false;
  loading:Loading;
  open=false;
  locc:string="ios-locate-outline";
  shopopen=ShopopenPage;
  collor:string="primary";
  location_alert:string="Current Location Access(OFF)";
  @ViewChild('locationn')locationn:Toggle;

  constructor(public loadingCtrl:LoadingController,public location:LocationTracker,public http:Http,public toastCtrl: ToastController,public alertCtrl: AlertController,public connectivityService:ConnectivityService, public navCtrl: NavController,public abmnu:Abmnu,public actionsheetCtrl: ActionSheetController,public platform:Platform,public modalCtrl:ModalController) {
    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });



    //this.abmnu.errror

    console.log('wallet init');

    this.loading.present();
   // console.log(this.abmnu.errror);

    this.getReviews();

  }


  locationedit(){

    console.log("updated start");
      var user = firebase.auth().currentUser;
      if (user != null) {
        var name = user.displayName;
        this.email1 = user.email;
        var photoUrl = user.photoURL;
      }

      this.update2 = {
        lat: this.location.lat,
        lng:this.location.lng
      }
      console.log("updated start");
      var headers = new Headers();
      headers.append('content-type', 'application/json;charset=UTF-8');
      headers.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({headers: headers});

      this.http.post('https://vioti.herokuapp.com/profile/upload/email/location/' + this.email1, JSON.stringify(this.update2), options)
        .map(res => res.json()).subscribe(data => {
        console.log(data)
        this.loading.dismissAll();
        //this.Dismiss();
        //this.navCtrl.push(WalletPage);
      }, err => {
        console.log("Error!:", err.json());
        this.loading.dismissAll();
      });


    }





  initializeItems(){

    this.items=this.wendor;
  }




 viewphoto(url){
   PhotoViewer.show(url, '', {share: true});
 }




  getReviews(){


    if(this.connectivityService.isOnline())
    {


      var user = firebase.auth().currentUser;
      if (user != null) {
        var  name = user.displayName;
        this.email1 = user.email;
        var  photoUrl = user.photoURL;
      }

      if (this.data) {
        console.log("g");
        // return Promise.resolve(this.data);
        return new Promise(resolve => {


          this.http.get('https://vioti.herokuapp.com/profile/' + this.email1)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
                //console.log(data);
                this.wendor = data;
                this.showThis = true;
                this.open = false;
                this.loading.dismissAll();

                console.log("reloded");

              },
              err => {
                this.showThis = false;
                this.open = true;
                console.log("data not matched");
                this.loading.dismissAll();

                console.log("Oops!");

              }
            );


        });


      }

      return new Promise(resolve => {


        this.http.get('https://vioti.herokuapp.com/profile/' + this.email1)
          .map(res => res.json())
          .subscribe(data => {
              this.data = data;
              resolve(this.data);
              this.wendor = data;
              this.showThis = true;
              this.open = false;
              this.loading.dismissAll();

              //console.log(data);
              console.log("ghdgggg");


            },

            err => {
              //
              //      this.data={"error":"error"};
              this.showThis = false;
              this.open = true;
              console.log("data not matched");
              this.loading.dismissAll();

              console.log("Oops");

              //  return this.errror=2;


            },
            () => {
              console.log("Done");
//              errror=2;

              //return this.errror=2;

            }
          );


      });
    }

    else {
      this.loading.dismissAll();

      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'No Internet Connectivity..',
        buttons: [
          {
            text:'Try Again',
            handler:()=>{
              this.getReviews();
            }
          }
        ]
      });
      alert.present();
    }
  }







  openMenu(id,itemname,itemno,itemdiscription,itemprice) {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-create' : null,
          handler: () => {
            this.edit(id,itemname,itemno,itemdiscription,itemprice);
           // console.log('Delete clicked');
          }
        },
        {
          text: 'Delete',
          icon: !this.platform.is('ios') ? 'md-trash' : null,
          handler: () => {
            this.showConfirm(id);
            console.log('Share clicked');
          }
        },

        {
          text: 'Add one more image',
          icon: !this.platform.is('ios') ? 'md-image' : null,
          handler: () => {
           this.addonemore(id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  doRefresh(refresher) {
    this.getReviews();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  showConfirm(id) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'this item will be remove from you list item',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteReview(id)
          }
        }
      ]
    });
    confirm.present();
  }


  deleteReview(id) {

    this.http.get('https://vioti.herokuapp.com/profile/email/'+this.email1+'/delete/' + id).subscribe((res) => {

      console.log(res.json());

     let index = this.wendor.item.indexOf(this.wendor.item);
     this.wendor.item.splice(id, 1);
      setTimeout(() => {
        console.log('Async operation has ended');
        this.getReviews();
      }, 2000);

    });

    this.getReviews();

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }




  edit(id,itemname,itemno,itemdiscription,itemprice){
    let modal = this.modalCtrl.create(EdititemPage,{item_name:itemname,item_no:itemno,item_price:itemprice,item_discription:itemdiscription,_id:id});
    modal.present();
    modal.onDidDismiss(() => {
      this.getReviews();


    });


  }



  shopdet(){
    this.navCtrl.push(ShopdetPage,{"lat":this.wendor.lat,"lng":this.wendor.lat,"shopname":this.wendor.name})
  }





  placeedit(){
    let modal = this.modalCtrl.create(LocationeditPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.getReviews();


    });



  }

  addonemore(id){
    let modal = this.modalCtrl.create(OnemorePage,{_id:id});
    modal.present();
    modal.onDidDismiss(() => {
      this.getReviews();


    });

  }


  chnge(){

    if(this.locc=="ios-locate-outline") {
      this.refreshIntervalId = window.setInterval(() => {
        this.locationedit()
      }, 1700);
      this.locc="ios-locate";
       this.collor="four";
      this.location_alert="Current Location Access(ON)";
    }
    else {
      window.clearInterval(this.refreshIntervalId);
      this.locc="ios-locate-outline";
      this.collor="primary";
      this.location_alert="Current Location Access(OFF)";
    }
    }


    openeditor(){

    let modal = this.modalCtrl.create(TitleeditorPage,{shopname:this.wendor.name,shoplocation:this.wendor.address,shopcata:this.wendor.catagory,shoplink:this.wendor.link});
    modal.present();
      modal.onDidDismiss(() => {
        this.getReviews();


      });

  }


  togglechage(){
   console.log("khkhkhk");

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    var statuss=this.wendor.status;

    if(statuss=="true")
    {
      this.finalstatus="false";
    }
    else {
      this.finalstatus="true";
    }

    console.log(this.finalstatus);

    var sttatus={
      status:this.finalstatus
    }
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/profile/upload/email/status/' + this.email1, JSON.stringify(sttatus), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
    }, err => {
      console.log("Error!:", err.json());

    });


    this.getReviews();

  }






  openbarcode(){

  let modal = this.modalCtrl.create(QrcodePage,{shopname:this.wendor.name,shopimage:this.wendor.profileimage,shopcata:this.wendor.catagory});
  modal.present();


  }


  profilepc(){
    let modal = this.modalCtrl.create(ProfilephotoPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.getReviews();


    });


  }

  opencontact(){
    let modal = this.modalCtrl.create(AphoneverPage);
    modal.present();


  }

  opendiscription(){

    let modal = this.modalCtrl.create(TitlediscriptionPage,{shopdiscription:this.wendor.discription});
    modal.present();
    modal.onDidDismiss(() => {
      this.getReviews();


    });


  }

 openitem() {
   let modal = this.modalCtrl.create(TitleitemPage);
   modal.present();
   modal.onDidDismiss(() => {
     this.getReviews();


   });

 }

  additem(){

    let modal = this.modalCtrl.create(AdditemPage);
    modal.present();

    modal.onDidDismiss(() => {
      this.getReviews();


    });

  }

  ////visiblity of phone no
  togglechagephone(){
    this.presentToast("wait..")

    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    var statuss=this.wendor.status_phone;

    if(statuss=="true")
    {

      this.finalstatuss="false";
    }
    else {
      this.finalstatuss="true";
    }

    console.log("gjgjhgj"+ this.finalstatuss);

    var stttatus={
      statuss:this.finalstatuss
    }
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vioti.herokuapp.com/profile/upload/email/status/phonevisible/' + this.email1, JSON.stringify(stttatus), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
    }, err => {
      console.log("Error!:", err.json());

    });


    this.getReviews();

  }



  getItems(ev) {
   // this.searching = true;
    // Reset items back to all of the items
    this.initializeItems();
    // this.listshow=true;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items



    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(this.filtter);
        this.grip=true;

        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }


  }

  checkFocus()
  {
    this.grip=true;

  }

  checkBlur(){
    this.grip=false;
  }


}
