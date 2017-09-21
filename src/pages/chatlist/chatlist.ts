import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import PouchDB from 'pouchdb';
import * as io from 'socket.io-client';
import {ChatbotPagePage} from "../chatbot/chatbot";

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
  rowss:any;
  lastmessage:string="";
  Lastarray=[];
  val:any;
  socket:any;
  recmail:any="";
  type:any="";
  user:any=[{"name":"ABhimanyu","image":"assets/image/abmnu.jpg","email":"abmnukmr@gmail.com"},{"name":"Davis Deep","image":"assets/image/dp.png","email":"davis_deep@gmail.com"},{"name":"Rohit Nandan","image":"assets/image/dp.png","email":"nandan_rohit@gmail.com"},{"name":"Sumit Singh","image":"assets/image/dp.png","email":"sumit007@gmail.com"}]
  constructor(public navCtrl: NavController,public Mdl:ModalController) {
    this.socket = io('https://vioti.herokuapp.com/');

    this.join();
    this.refresh();




    this.socket.on('gettomessage', (msg) => {
      if(msg!= null) {
        var index =this.user.findIndex(function(item, i){
          return item.email === msg.email
        })

        this.user[index].message
        this.socket.emit('socketjoined',msg.email)

        console.log("message", msg.email);
        console.log("check");



      }
    });



    this.socket.on('typingrec', (msg) => {
      this.type=msg.type;
      this.recmail=msg.email
      console.log(this.type)
    });



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


    let profileModal = this.Mdl.create(ChatbotPagePage,{"name":name,"image":image,"email":email});
    profileModal.onDidDismiss(data => {
      this.dore();
      console.log("hiiii");
    });
    profileModal.present();
  }


  setupdb(db){
    this.db = new PouchDB(db);
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
          return a.doc.tid -b.doc.tid ;
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
