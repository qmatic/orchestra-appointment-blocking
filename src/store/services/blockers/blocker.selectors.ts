import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBlockerState } from '../../reducers/blocker.reducer';

// selectors
const getBlockerState = createFeatureSelector<IBlockerState>('blockers');

const getAllBlockers = createSelector(
  getBlockerState,
  (state: IBlockerState) => state.blockers
);

const isLoaded = createSelector(
  getBlockerState,
  (state: IBlockerState) => state.loaded
);

const hasCreateError = createSelector(
  getBlockerState,
  (state: IBlockerState) => state.error
);

@Injectable()
export class BlockerSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  blockers$ = this.store.select(getAllBlockers);
  isLoaded$ = this.store.select(isLoaded);
  hasError$ = this.store.select(hasCreateError);
}
