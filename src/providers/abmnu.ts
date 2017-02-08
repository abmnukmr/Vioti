import {Injectable, NgZone} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Abmnu provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Abmnu {
  data: any;
  constructor(public http: Http,public zone: NgZone) {

      this.getReviews();
    console.log('Hello Abmnu Provider');

  }

  getReviews(id){




    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {


      this.http.get('https://vioti.herokuapp.com/profile/'+id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(data);
            console.log("ghdgggg");
         },
          err => {
            console.log("Oops!");
          }
        );
    });
  }






}
