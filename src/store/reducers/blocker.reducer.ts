import { IBlocker } from '../../models/IBlocker';
import * as BlockerActions from '../actions';

export interface IBlockerState {
  blockers: IBlocker[];
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IBlockerState = {
  blockers: [],
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IBlockerState = initialState,
  action: BlockerActions.AllBlockersActions
): IBlockerState {
  switch (action.type) {
    case BlockerActions.FETCH_BLOCKERS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BlockerActions.FETCH_BLOCKERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        blockers: action.payload.appointmentList,
        loading: false,
        error: null
      };
    }
    case BlockerActions.FETCH_BLOCKERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BlockerActions.SET_BLOCKER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BlockerActions.SET_BLOCKER_SUCCESS: {
      return {
        ...state,
        blockers: addBlocker(state, action.payload),
        loading: false,
        error: null
      };
    }
    case BlockerActions.SET_BLOCKER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BlockerActions.UPDATE_BLOCKER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BlockerActions.UPDATE_BLOCKER_SUCCESS: {
      return {
        ...state,
        blockers: removeBlocker(state, action.payload),
        loading: false,
        error: null
      };
    }
    case BlockerActions.UPDATE_BLOCKER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BlockerActions.DELETE_BLOCKER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BlockerActions.DELETE_BLOCKER_SUCCESS: {
      return {
        ...state,
        blockers: removeBlocker(state, action.payload),
        loading: false,
        error: null
      };
    }
    case BlockerActions.DELETE_BLOCKER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default: {
        return state;
    }
  }
}

function removeBlocker(
  state: IBlockerState,
  blockerToRemove: IBlocker
) {
  let blockerSet = state.blockers.filter(
    (blocker: IBlocker) =>
      blocker.id !== blockerToRemove.id
  );
  return blockerSet;
}

function updateBlocker(
  state: IBlockerState,
  blockerToUpdate: IBlocker
) {
  let updateItem = state.blockers.find(function(obj){
    return obj.id === blockerToUpdate.id
  });

  let index = state.blockers.indexOf(updateItem);
  var blockerSet = Object.assign({}, state);
  blockerSet.blockers[index] = blockerToUpdate;
  
  return blockerSet;
}

function addBlocker(
  state: IBlockerState,
  blockerToAdd: IBlocker
) {
  var blockerSet = state.blockers.concat([blockerToAdd]);
  return blockerSet;
}
