import { IBlogState, initialState } from '../states/index';
import * as actions from '../actions/blog.action';

export function reducer(
  state: IBlogState = initialState,
  action: actions.Actions
): IBlogState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED_GUESTBOOK:
      return (<any>Object).assign({}, state, {
        guestbook: action.payload
      });
    case actions.ActionTypes.INITIALIZED_POSTS:
      return (<any>Object).assign({}, state, {
        posts: action.payload
      });
    case actions.ActionTypes.GUEST_COMMENT_ADDED:
      return (<any>Object).assign({}, state, {
        guestbook: [...state.guestbook, action.payload]
      });
    default:
      return state;
  }
}
