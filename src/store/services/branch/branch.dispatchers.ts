import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as BranchActions from '../../actions';

@Injectable()
export class BranchDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchBranches() {
    this.store.dispatch(new BranchActions.FetchBranches);
  }
}
