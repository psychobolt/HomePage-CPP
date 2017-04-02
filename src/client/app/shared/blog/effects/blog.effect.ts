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
  
  @Effect() initPosts$: Observable<Action> = this.actions$
    .ofType(blog.ActionTypes.INIT)
    .startWith(new blog.InitAction)
    .switchMap(() => this.blogService.getPosts())
    .map(posts => new blog.InitializedPostsAction(posts))
    .catch(() => Observable.of(new blog.InitFailedAction()));

  @Effect() initGuestbook$: Observable<Action> = this.actions$
    .ofType(blog.ActionTypes.INIT)
    .startWith(new blog.InitAction)
    .switchMap(() => this.blogService.getGuestbook())
    .map(guestbook => new blog.InitializedGuestbookAction(guestbook))
    .catch(() => Observable.of(new blog.InitFailedAction()));

  @Effect() signGuestbook$: Observable<Action> = this.actions$
    .ofType(blog.ActionTypes.SIGN_GUESTBOOK)
    .switchMap((action: blog.SignGuestbookAction) => this.blogService.signGuestbook(action.payload))
    .map(comment => new blog.GuestCommentAddedAction(comment))
    .catch(() => Observable.of(new blog.SignGuestbookFailedAction()));

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private blogService: BlogService
  ) { }
}
