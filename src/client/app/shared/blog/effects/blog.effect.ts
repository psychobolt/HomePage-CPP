// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { BlogService } from '../services/blog.service';
import * as blog from '../actions/blog.action';

@Injectable()
export class BlogEffects {
  
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect() init$: Observable<Action> = this.actions$
    .ofType(blog.ActionTypes.INIT)
    .startWith(new blog.InitAction);

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private blogService: BlogService
  ) { }
}