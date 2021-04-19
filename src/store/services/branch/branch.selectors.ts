import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBranchState } from '../../reducers/branch.reducer';
import { IBranch } from '../../../models/IBranch';


// selectors
const getBranchState = createFeatureSelector<IBranchState>('branches');

const getAllBranches = createSelector(
  getBranchState,
  (state: IBranchState) => state.branches
);

const getVisibleBranches = createSelector(
  getBranchState,
  (
    branchState: IBranchState,
  ) => {
  }
);

export const getSelectedBranch = createSelector(
  getBranchState,
  (state: IBranchState) => state.selectedBranch
);

const getBranchesSearchText = createSelector(
  getBranchState,
  (state: IBranchState) => state.searchText
);

@Injectable()
export class BranchSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  branches$ = this.store.select(getAllBranches);
}
