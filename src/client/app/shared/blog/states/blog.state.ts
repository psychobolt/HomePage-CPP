import { Observable } from 'rxjs/Observable';
import { IPost, IComment } from '../models';

export interface IBlogState {
  posts: Array<IPost>;
  guestbook: Array<IComment>;
}

export const initialState: IBlogState = {
  posts: <Array<IPost>>[],
  guestbook: <Array<IComment>>[]
};

export function getPosts(state$: Observable<IBlogState>) {
  return state$.select(state => state.posts);
}

export function getGuestbook(state$: Observable<IBlogState>) {
  return state$.select(state => state.guestbook);
}
