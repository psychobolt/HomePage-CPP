// angular
import {Injectable, Inject, NgZone} from '@angular/core';

// libs
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

// app
import { FIREBASE } from '../index';

@Injectable()
export class FirebaseService {

  private database:any;
  private onSync:Function;
  private userID:string;

  constructor(@Inject(FIREBASE) firebase:any, private ngZone: NgZone) {
    console.log('Constructing DatabaseService');
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyCpp-BYOsxv8Wg_mzA0YGSExcigEIZSiGo',
      authDomain: 'blog-59395.firebaseapp.com',
      databaseURL: 'https://blog-59395.firebaseio.com',
      projectId: 'blog-59395',
      storageBucket: 'blog-59395.appspot.com',
      messagingSenderId: '1009904600836'
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  sync(path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).on('value', snapshot => {
        this.ngZone.run(() => {
          observer.next(snapshot.val());
          observer.complete();
        });
      });
    });
  }

  addChild(path: string, data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).push(data, err => {
        if (err) {
          observer.error(err);
        } else {
          this.ngZone.run(() => {
            observer.next(data);
            observer.complete();
          });
        }
      });
    });
  }
}
