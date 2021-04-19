import { Action } from '@ngrx/store';
import { IBlocker } from '../../models/IBlocker';
import { IBlockerResponse } from '../../models/IBlockerResponse';

// Appointment actions
export const FETCH_BLOCKERS = '[Blocker] FETCH_BLOCKERS';
export const FETCH_BLOCKERS_FAIL = '[Blocker] FETCH_BLOCKERS_FAIL';
export const FETCH_BLOCKERS_SUCCESS = '[Blocker] FETCH_BLOCKERS_SUCCESS';
export const DELETE_BLOCKER = '[Blocker] DELETE_BLOCKER';
export const DELETE_BLOCKER_FAIL = '[Blocker] DELETE_BLOCKER_FAIL';
export const DELETE_BLOCKER_SUCCESS = '[Blocker] DELETE_BLOCKER_SUCCESS';
export const SET_BLOCKER = '[Blocker] SET_BLOCKER';
export const SET_BLOCKER_FAIL = '[Blocker] SET_BLOCKER_FAIL';
export const SET_BLOCKER_SUCCESS = '[Blocker] SET_BLOCKER_SUCCESS';
export const UPDATE_BLOCKER = '[Blocker] UPDATE_BLOCKER';
export const UPDATE_BLOCKER_FAIL = '[Blocker] UPDATE_BLOCKER_FAIL';
export const UPDATE_BLOCKER_SUCCESS = '[Blocker] UPDATE_BLOCKER_SUCCESS';

export class FetchBlockers implements Action {
  readonly type = FETCH_BLOCKERS;
  constructor(public payload: string) {}
}

export class FetchBlockersFail implements Action {
  readonly type = FETCH_BLOCKERS_FAIL;
  constructor(public payload: Object) {}
}

export class FetchBlockersSuccess implements Action {
  readonly type = FETCH_BLOCKERS_SUCCESS;
  constructor(public payload: IBlockerResponse) {}
}

export class SetBlocker implements Action {
  readonly type = SET_BLOCKER;
  constructor(public payload: IBlocker) {}
}

export class SetBlockerFail implements Action {
  readonly type = SET_BLOCKER_FAIL;
  constructor(public payload: Object) {}
}

export class SetBlockerSuccess implements Action {
  readonly type = SET_BLOCKER_SUCCESS;
  constructor(public payload: IBlocker) {}
}

export class UpdateBlocker implements Action {
  readonly type = UPDATE_BLOCKER;
  constructor(public payload: IBlocker) {}
}

export class UpdateBlockerFail implements Action {
  readonly type = UPDATE_BLOCKER_FAIL;
  constructor(public payload: Object) {}
}

export class UpdateBlockerSuccess implements Action {
  readonly type = UPDATE_BLOCKER_SUCCESS;
  constructor(public payload: IBlocker) {}
}

export class DeleteBlocker implements Action {
  readonly type = DELETE_BLOCKER;
  constructor(public payload: IBlocker) {}
}

export class DeleteBlockerFail implements Action {
  readonly type = DELETE_BLOCKER_FAIL;
  constructor(public payload: Object) {}
}

export class DeleteBlockerSuccess implements Action {
  readonly type = DELETE_BLOCKER_SUCCESS;
  constructor(public payload: IBlocker) {}
}

// Action types
export type AllBlockersActions = FetchBlockers |
                                    FetchBlockersFail |
                                    FetchBlockersSuccess |
                                    DeleteBlocker |
                                    DeleteBlockerFail |
                                    DeleteBlockerSuccess |
                                    SetBlocker |
                                    SetBlockerFail |
                                    SetBlockerSuccess |
                                    UpdateBlocker |
                                    UpdateBlockerFail |
                                    UpdateBlockerSuccess;
