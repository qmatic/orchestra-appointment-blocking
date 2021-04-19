import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IAccountState } from '../../reducers/account.reducer';
import { IAccount } from '../../../models/IAccount';

// selectors
const getAccountState = createFeatureSelector<IAccountState>('account');

const getAccount = createSelector(
  getAccountState,
  (state: IAccountState) => state.data
);

const getAccess = createSelector(
  getAccountState,
  (state: IAccountState) => state.canAccess
);

const getUserFullName = createSelector(
    getAccount,
  (state: IAccount) => state.fullName
);

export const getUserLocale = createSelector(
  getAccount,
  (state: IAccount) => state.locale
);

const getUserDirection = createSelector(
  getAccount,
  (state: IAccount) => state.direction
);

const getUserBranchIds = createSelector(
  getAccount,
  (state: IAccount) => state.branchIds
);

const isLoaded = createSelector(
  getAccountState,
  (state: IAccountState) => state.loaded
);

const getUserUserName = createSelector(
  getAccount,
  (state: IAccount) => state.userName
);

@Injectable()
export class AccountSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  
  user$ = this.store.select(getAccount);
  userFullName$ = this.store.select(getUserFullName);
  userLocale$ = this.store.select(getUserLocale);
  userDirection$ = this.store.select(getUserDirection);
  access$ = this.store.select(getAccess);
  branchIds$ = this.store.select(getUserBranchIds);
  isLoaded$ = this.store.select(isLoaded);
  userUserName$ = this.store.select(getUserUserName);
}
