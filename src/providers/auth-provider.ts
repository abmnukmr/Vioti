import { Injectable, EventEmitter, Inject } from '@angular/core';
import {AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp} from 'angularfire2'; //Add FirebaseApp
import { Observable } from "rxjs/Observable";
import {Platform, AlertController} from 'ionic-angular';
import {GooglePlus, Facebook} from 'ionic-native';
import {auth} from "firebase";
import firebase from 'firebase';


@Injectable()
export class AuthProvider {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState>=new EventEmitter<FirebaseAuthState>();
  public firebase : any;

  userProfile: any = null;
  constructor(private af: AngularFire, @Inject(FirebaseApp)firebase: any,private platform: Platform, public alertController : AlertController) { //Add platform
    this.firebase = firebase;
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
  }


  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile']).then(res => {
          const facebookCredential = (<any> firebase.auth.FacebookAuthProvider).credential(res.authResponse.accessToken);
          this.firebase.auth().signInWithCredential(facebookCredential).then(()=>{
            observer.next();
          }).catch(error => {
            //console.log(error);
            observer.error(error);
          });
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then(()=>{
          observer.next();
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      }
    });
  }


  googlePlusLogin()
  {

    this.af.auth.subscribe((data: FirebaseAuthState) => {

      this.af.auth.unsubscribe()
      console.log("in auth subscribe", data)

      this.platform.ready().then(() => {
        GooglePlus.login({
          'webClientId':'553959685910-91e49580oovo6qj181m1bkqdvmmi6jkl.apps.googleusercontent.com' //your Android reverse client id
        })
          .then((userData) => {

            console.log("userData " + JSON.stringify(userData));
            console.log("firebase " + firebase);
            const provider = (<any> firebase.auth.FacebookAuthProvider).credential(userData.idToken);

            firebase.auth().signInWithCredential(provider)
              .then((success) => {
                console.log("Firebase success: " + JSON.stringify(success));
                this.displayAlert(JSON.stringify(success),"signInWithCredential successful")
                this.userProfile = success;

              })
              .catch((error) => {
                console.log("Firebase failure: " + JSON.stringify(error));
                this.displayAlert(error,"signInWithCredential failed")
              });

          })
          .catch((gplusErr) => {
            console.log("GooglePlus failure: " + JSON.stringify(gplusErr));
            this.displayAlert(JSON.stringify(gplusErr),"GooglePlus failed")
          });

      })
    })

  }

  displayAlert(value,title)
  {
    let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
        {
          text: "OK"
        }
      ]
    });
    coolAlert.present();

  }

  loginWithGoogle() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        return GooglePlus.login({

          'webClientId':'553959685910-jqqrb0oalsjf8uf8rrngtc7hrkfr45ue.apps.googleusercontent.com',
          'offline': true
          //your Android reverse client id
        }).then(userData => {
         // var token = userData.idToken;
         // var accessId=userData.accessToken;
          const googleCredential = (<any> firebase.auth.GoogleAuthProvider).credential(userData.idToken,userData.accessToken);
          this.firebase.auth().signInWithCredential(googleCredential).then((success)=>{
            observer.next(success);
          }).catch(error => {
            //console.log(error);
            observer.error(error);
          });
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
        }).then(()=>{
          observer.next();
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      }
    });
  }







  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        //console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then(authData => {
        //authData.auth.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
        observer.next(authData);
      }).catch(error => {
        //console.log(error);
        observer.error(error);
      });
    });
  }

  resetPassword(emailAddress:string){
    return Observable.create(observer => {
      this.firebase.auth().sendPasswordResetEmail(emailAddress).then(function(success) {
        //console.log('email sent', success);
        observer.next(success);
      }, function(error) {
        //console.log('error sending email',error);
        observer.error(error);
      });
    });
  }

  logout() {
    this.af.auth.logout();
  }

  get currentUser():string{
    return this.authState?this.authState.auth.email:'';
  }
}
