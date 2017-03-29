// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { CATEGORY } from '../common/category.common';
import { IPost, IComment } from '../models';
import { DatabaseService } from '../services';

// module
import { IBlogState } from '../states/index';

@Injectable()
export class BlogService extends Analytics {

  constructor(
    public database: DatabaseService,
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
}
