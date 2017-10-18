import { Component } from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import PouchDB from 'pouchdb';
import * as io from 'socket.io-client';
import {ChatbotPagePage} from "../chatbot/chatbot";
import * as firebase from "firebase/app";
import { Storage } from '@ionic/storage';

//import {storage} from 'ionic-native';
/*
  Generated class for the ChatlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html'
})
export class ChatlistPagePage {

  db:any;
  dbb:any;
  rowss:any;
  lastmessage:string="";
  Lastarray=[];
  val:any;
  index:any;
  socket:any;
  recmail:any="";
  type:any="";
  user=[];
  userb:any;
  email1:any;
    constructor(public alertCtrl:AlertController,public navCtrl: NavController,public Mdl:ModalController,public storage:Storage) {

      var user = firebase.auth().currentUser;
      if (user != null) {
        this.email1 = user.email;

      }


      this.storage.get('name').then((val) => {
        if(val==null){
          this.showCheckbox()
        }
        else {
          this.userb=val;
        }


      });


      /*
       this.socket.on('gettomessage', (msg) => {
         if(msg!= null) {

           this.index =this.user.findIndex((item, i)=>{
             return item.email === msg.email
           })

           this.user[this.index].message
           this.socket.emit('socketjoined',msg.email)

           console.log("message", msg.email);
           console.log("check");



         }
       });*/





      }




  showCheckbox() {
    let prompt = this.alertCtrl.create({
      title: 'Add your Name',
      message: "Set your Store Name if you have store on VAIOTI",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
        }


      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
             this.userb=data.name;
            this.storage.set('name', data.name);

            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidEnter(){

   console.log("Enter")
    this.setupdbb()

    this.dbb.allDocs({include_docs:true},(err,result)=>{
      console.log("check")

      if(!err){

        let  rows=result.rows;
        console.log(" check i  fetch"+rows.length)

        for(let i=0; i< rows.length; i++){
          console.log(rows[i].doc);

          this.user.push(rows[i].doc)
          // console.log(rows[i].doc);

        }
        this.refresh();
       // this.join();
        console.log(" check i  fetch")

        // console.log(this.chats);
      }
      else {
        console.log(" check i can't fetch")

      }

    })




    // this.getdata();
  }




  ionViewWillLeave(){
    this.user=[];
    this.Lastarray=[];

    this.refresh();
   // this.join();

    console.log("jjgsjhagjhags")

  }


  join(){
    for(let i=0; i<this.user.length; i++){
      this.socket.emit('socketjoined',this.user[i].email)

    }
  }







  refresh(){
    for(let i=0; i<this.user.length;i++)
    {
      var fi=this.getdata(this.user[i].email)

      //this.Lastarray.push(this.getdata(this.user[i].email))

    }

  }

  dore(){
    this.Lastarray=[];
    for(let i=0; i<this.user.length;i++)
    {
      var fi=this.getdata(this.user[i].email)

      //this.Lastarray.push(this.getdata(this.user[i].email))

    }

  }

  gotochatbot(name,image,email){


    let profileModal = this.Mdl.create(ChatbotPagePage,{"name":name,"profilimg":image,"email":email});
    profileModal.onDidDismiss(data => {
      this.dore();
      console.log("hiiii");
    });
    profileModal.present();
  }



  setupdb(db){
    this.db = new PouchDB(db);
  }

  setupdbb(){
    console.log("Attribute")
    this.dbb = new PouchDB("chatlist")
  }


  sortByAttribue(arr, attribute) {
    return arr.sort(function(a,b) {
      return a.attribute < b.attribute;
    });

  }

  hoto(){

    let sum=4+3;
    return sum;
  }





  getdata(db){
    this.setupdb(db);
    var as;
    this.db.allDocs({include_docs:true},(err,result)=>{
      if(!err){
        this.rowss=result.rows;

        this.rowss.sort((a, b)=> {
          return a.doc.tid -b.doc.tid;
        });
        let gi=this.rowss[this.rowss.length -1]

        as =gi.doc.message;
        this.lastmessage=as;
        console.log(gi.doc);


        this.Lastarray.push(gi.doc)
      }
    })

  }

}
