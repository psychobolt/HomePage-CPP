import {Injectable, Inject, NgZone} from '@angular/core';
import {FIREBASE} from '../../blog/index';

@Injectable()
export class DatabaseService {
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
      storageBucket: 'blog-59395.appspot.com',
      messagingSenderId: '1009904600836'
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  sync(path: string, onValueReceived: Function):void {
    this.database.ref(path).on('value', (snapshot:any) => {
      this.ngZone.run(() => {
        onValueReceived(snapshot.val());
      });
    });
  }

  addChild(path: string, data:any, callback?:Function):void {
    this.database.ref(path).push(data, (err:any) => {
      if (callback && !err) {
        this.ngZone.run(() => {
          callback();
        });
      }
    });
  }
}
