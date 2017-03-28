import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { CATEGORY } from '../common/category.common';

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
  INITIALIZED: string;
  INIT_FAILED: string;
  SIGN_GUESTBOOK: string;
  GUEST_COMMENT_ADDED: string;
}

export const ActionTypes: IBlogActions = {
  INIT: type(`${CATEGORY} Init`),
  INITIALIZED: type(`${CATEGORY} Initialized`),
  INIT_FAILED: type(`${CATEGORY} Init Failed`),
  SIGN_GUESTBOOK: type(`${CATEGORY} Signed Guestbook`),
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

export class InitializedAction implements Action {
  type = ActionTypes.INITIALIZED;

  constructor(public payload: Array<string>) { }
}

export class InitFailedAction implements Action {
  type = ActionTypes.INIT_FAILED;
  payload: string = null;
}

export class SignGuestbookAction implements Action {
  type = ActionTypes.SIGN_GUESTBOOK;

  constructor(public payload: string) { }
}

export class GuestCommentAddedAction implements Action {
  type = ActionTypes.GUEST_COMMENT_ADDED;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  | InitializedAction
  | InitFailedAction
  | SignGuestbookAction
  | GuestCommentAddedAction;
