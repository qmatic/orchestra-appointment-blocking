import { IBranchResponse } from './../../models/IBranchResponse';
import { Action } from '@ngrx/store';

// Branch list actions
export const FETCH_BRANCHES = '[Branch] FETCH_BRANCHES';
export const FETCH_BRANCHES_FAIL = '[Branch] FETCH_BRANCHES_FAIL';
export const FETCH_BRANCHES_SUCCESS = '[Branch] FETCH_BRANCHES_SUCCESS';

export class FetchBranches implements Action {
  readonly type = FETCH_BRANCHES;
}
export class FetchBranchesFail implements Action {
  readonly type = FETCH_BRANCHES_FAIL;
  constructor(public payload: Object) {}
}

export class FetchBranchesSuccess implements Action {
  readonly type = FETCH_BRANCHES_SUCCESS;
  constructor(public payload: IBranchResponse) {}
}

export type AllBranchActions = FetchBranches |
                               FetchBranchesFail |
                               FetchBranchesSuccess;
