// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { CATEGORY } from '../common/category.common';
import { IPost } from '../models';
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

  // getPosts(): Observable<Array<IPost>> {
  //   return this.database.sync('posts').
  // }
}
