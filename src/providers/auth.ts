import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {


  public fireAuth: any;
  public userData: any;



  constructor() {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userProfile');
  }
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string,phone:string,name:string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userData.child(newUser.uid).set({email:email, phone:phone, name:name});
      });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }



  doLogout(): any {
    return this.fireAuth.signOut();
  }




  authgoogle():any{

    var provider = new firebase.auth.GoogleAuthProvider();
 provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
     // var errorCode = error.code;
     // var errorMessage = error.message;
      // The email of the user's account used.
     // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
     // var credential = error.credential;
      // ...
    });

  }


}
