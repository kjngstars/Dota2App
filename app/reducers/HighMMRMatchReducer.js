import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function highMMRMatchesState(state = initialState.highMMRMatches, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_HIGHMMR_MATCH_DETAILS:            
            return Object.assign({}, state, { isLoadingHighMMRMatches: true, isEmptyHighMMRMatches: false, highMMRMatches: {} });
        case ActionTypes.RECEIVE_HIGHMMR_MATCH_DETAILS:
            return Object.assign({}, state, { isLoadingHighMMRMatches: false, isEmptyHighMMRMatches: false, highMMRMatches: action.highMMRMatches });
        case ActionTypes.RECEIVE_EMPTY_HIGHMMR_MATCH_DETAILS:
            return Object.assign({}, state, { isLoadingHighMMRMatches: false, isEmptyHighMMRMatches: true, highMMRMatches: {} });
        default:
            return state;
    }
}
