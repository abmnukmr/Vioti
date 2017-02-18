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



}
