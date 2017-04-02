// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { CATEGORY } from '../common/category.common';
import { IPost, IComment } from '../models/index';
import { FirebaseService } from '../../database/services/index';

// module
import { IBlogState } from '../states/index';

@Injectable()
export class BlogService extends Analytics {

  constructor(
    public database: FirebaseService,
    public analytics: AnalyticsService,
    private store: Store<IBlogState>,
  ) {
    super(analytics);
    this.category = CATEGORY;
  }

  getPosts(): Observable<Array<IPost>> {
    return this.database.sync('posts').map(response => {
      let posts = Array<IPost>();
      if (response) {
        for (let key of Object.keys(response)) {
          posts = [... posts, Object.assign({}, response[key], {id: key})];
        }
      }
      return posts;
    });
  }

  getGuestbook(): Observable<Array<IComment>> {
    return this.database.sync('guestbook').map(response => {
      let guestbook = Array<IComment>();
      if (response) {
        for (let key of Object.keys(response)) {
          guestbook = [... guestbook, Object.assign({}, response[key], {id: key})];
        }
      }
      return guestbook;
    });
  }

  signGuestbook(content: string): Observable<IComment> {
    let date = Date.now();
    let comment: IComment = {
      content,
      published_date: date,
      updated_date: date
    };
    return this.database.addChild('guestbook', comment).map(() => comment);
  }
}
