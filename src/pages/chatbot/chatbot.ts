import {Component, NgZone, ViewChild} from '@angular/core';
import {Content,  NavController, NavParams, ViewController} from 'ionic-angular';
import * as io from 'socket.io-client';
import * as moment from 'moment'
import * as firebase from "firebase/app";

import PouchDB from 'pouchdb';
/*
  Generated class for the ChatbotPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html'
})
export class ChatbotPagePage {

  name:any;
  image:any;
  email2:any;
  socket:any;
  showif:boolean=true;
  chats=[];
  db:any;
  dt:any;
  toggled: boolean = false;
  message:any;
  self_text:boolean=true;
  clint_text:boolean=true;
  self_image:boolean=true;
  clint_image:boolean=true;
  msg:any;
  chatbox:any;
  count:any=0;
  email1:any;

  scrollAmount:any=0;

  type:any;
  user_name:any="Abhimanyu";
  url:any;
  @ViewChild(Content)content: Content;

  @ViewChild('textarea')textarea;

  constructor(public navCtrl: NavController, public navParams: NavParams,public vctRl:ViewController,public zone:NgZone) {


    this.getchatdata();



    this.getdata();

    this.ScrollToBottom();
    //console.log(this.url)
    this.socket = io('https://vioti.herokuapp.com/');


    this.socket.emit('socketjoined',this.email2)

    this.socket.on('gettomessage', (msg) => {
      if(msg!= null) {

        console.log("message", msg.email);
        console.log("check");

        this.chats.push(msg);

        this.addata(msg);

        console.log(this.chats);


      }
    });


    this.socket.on('typingrec', (msg) => {
      this.type=msg.type;
      console.log(this.type)
    });



  }



  ionviewWillEnter(){

    // this.getdata();
  }


  oncan(){

    this.socket.on("closed",function (msg) {
      console.log(msg)
    })
    this.socket.off();
    this.socket.disconnect();
    this.socket = null;
    console.log("cross")
    this.vctRl.dismiss()



  }

  ionViewWillLeave(){

    this.socket.on("closed",function (msg) {
      console.log(msg)
    })
    this.socket.off();
    this.socket.disconnect();
    //this.socket = null;
    console.log("cross")

  }



  typing()
  {
    this.ScrollToBottom();
    this.msg={
      "type":"Typing...",
      "email":this.email1
    }
    this.socket.emit('typing', this.msg);




    setTimeout(() => {
      this.msg={
        "type":"",
        "email":this.email1
      }
      this.socket.emit('typing', this.msg);


    },1000);

  }

  ScrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    },400);
  }
  scro(){
    setTimeout(() => {
      this.content.scrollToBottom(200);
    },400);
  }
  send() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }

    this.msg={
      "user":this.name,
      "email":this.email2,
       "sender_mail":this.email1,
      "message":this.message +" ",
      "image":"http://www.iconsfind.com/wp-content/uploads/2016/10/20161014_58006bff8b1de.png",
      "docs":"",
      "notification_token":"",
      "time":moment().format('LT'),
      "tid":Date.now()
    }
    if(this.message != ''  ){
      this.socket.emit('gettomessage', this.msg);
    }
    else {

    }
    this.message = '';
    // this.setfo();
  }

  ionViewDidLoad() {
    // this.scro();
  }
  getchatdata(){
    this.name= this.navParams.get("name")
    this.email2=this.navParams.get("email")
    this.image=this.navParams.get("profilimg")
    this.setupdb(this.email2);

    //this.user_name="abmnukmr";

  }

  goback(){
    this.navCtrl.pop();

    this.socket.on("closed",function (msg) {
      console.log(msg)
    })
  }

  po(msg){
    this.chats.push(msg);

  }


  setfo(){
    setTimeout(() => {
      this.textarea.setFocus();
      this.ScrollToBottom()

    },400);
  }




  setupdb(db){
    this.db = new PouchDB(db);
  }




  getdata(){
    //this.setupdb();
    this.db.allDocs({include_docs:true},(err,result)=>{
      if(!err){
        let  rows=result.rows;
        for(let i=0;i<rows.length;i++){
          this.chats.push(rows[i].doc)
        }
        console.log(this.chats);
      }
    })
  }

  logging(){
    console.log("Sala Chutiyapa");
  }


  addata(msg)
  {
    //this.chats.push(msg);

    var item=[msg]
    this.db.bulkDocs( {"docs":item}, (err, result) => {
      if (!err) {

        this.ScrollToBottom();
        console.log("Successfully Added");

        console.log(result);
        return null;
      }
      else {
        console.log(err)
      }

    })

  }

}
