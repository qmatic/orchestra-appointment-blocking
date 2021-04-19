import { ActionReducerMap } from '@ngrx/store';
import * as fromBranch from './branch.reducer';
import * as fromSystemInfo from './systemInfo.reducer';
import * as fromBlockers from './blocker.reducer';
import * as fromAccount from './account.reducer';

export interface IAppState {
  branches: fromBranch.IBranchState;
  systemInfo: fromSystemInfo.ISystemInfoState;
  blockers: fromBlockers.IBlockerState;
  account: fromAccount.IAccountState;
}

export const reducers: ActionReducerMap<IAppState> = {
  branches: fromBranch.reducer,
  systemInfo: fromSystemInfo.reducer,
  blockers: fromBlockers.reducer,
  account: fromAccount.reducer,
  // here is where you put other reducers, when you have them
};
