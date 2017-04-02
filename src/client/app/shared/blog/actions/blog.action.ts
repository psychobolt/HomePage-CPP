import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { CATEGORY } from '../common/category.common';
import { IPost, IComment } from '../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IBlogActions {
  INIT: string;
  INIT_FAILED: string;
  INITIALIZED_POSTS: string;
  INITIALIZED_GUESTBOOK: string;
  SIGN_GUESTBOOK: string;
  SIGN_GUESTBOOK_FAILED: string;
  GUEST_COMMENT_ADDED: string;
}

export const ActionTypes: IBlogActions = {
  INIT: type(`${CATEGORY} Init`),
  INIT_FAILED: type(`${CATEGORY} Init Failed`),
  INITIALIZED_POSTS: type(`${CATEGORY} Initialized Posts`),
  INITIALIZED_GUESTBOOK: type(`${CATEGORY} Initialized Guestbook`),
  SIGN_GUESTBOOK: type(`${CATEGORY} Sign Guestbook`),
  SIGN_GUESTBOOK_FAILED: type(`${CATEGORY} Sign Guestbook Failed`),
  GUEST_COMMENT_ADDED: type(`${CATEGORY} Guest Comment Added`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class InitAction implements Action {
  type = ActionTypes.INIT;
  payload: string = null;
}

export class InitFailedAction implements Action {
  type = ActionTypes.INIT_FAILED;
  payload: string = null;
}

export class InitializedPostsAction implements Action {
  type = ActionTypes.INITIALIZED_POSTS;

  constructor(public payload: Array<IPost>) { }
}

export class InitializedGuestbookAction implements Action {
  type = ActionTypes.INITIALIZED_GUESTBOOK;

  constructor(public payload: Array<IComment>) { }
}

export class SignGuestbookAction implements Action {
  type = ActionTypes.SIGN_GUESTBOOK;

  constructor(public payload: string) { }
}

export class SignGuestbookFailedAction implements Action {
  type = ActionTypes.SIGN_GUESTBOOK_FAILED;
  payload: string = null;
}

export class GuestCommentAddedAction implements Action {
  type = ActionTypes.GUEST_COMMENT_ADDED;

  constructor(public payload: IComment) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  | InitFailedAction
  | InitializedPostsAction
  | InitializedGuestbookAction
  | SignGuestbookAction
  | SignGuestbookFailedAction
  | GuestCommentAddedAction;
