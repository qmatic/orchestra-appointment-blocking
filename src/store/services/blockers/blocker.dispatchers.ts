import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as BlockerActions from '../../actions';
import { IBlocker } from '../../../models/IBlocker';

@Injectable()
export class BlockerDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchBlockers(search: string) {
    this.store.dispatch(new BlockerActions.FetchBlockers(search));
  }

  deleteBlocker(blocker: IBlocker) {
    this.store.dispatch(new BlockerActions.DeleteBlocker(blocker));
  }

  updateBlocker(blocker: IBlocker) {
    this.store.dispatch(new BlockerActions.UpdateBlocker(blocker));
  }

  setBlocker(blocker: IBlocker) {
    this.store.dispatch(new BlockerActions.SetBlocker(blocker));
  }
}
