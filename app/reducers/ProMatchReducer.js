import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function matchDetailsState(state = initialState.proMatches, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_PROMATCH_DETAILS:            
            return Object.assign({}, state, { isLoadingProMatches: true, isEmptyProMatches: false, proMatches: {} });
        case ActionTypes.RECEIVE_PROMATCH_DETAILS:
            return Object.assign({}, state, { isLoadingProMatches: false, isEmptyProMatches: false, proMatches: action.proMatches });
        case ActionTypes.RECEIVE_EMPTY_PROMATCH_DETAILS:
            return Object.assign({}, state, { isLoadingProMatches: false, isEmptyProMatches: true, proMatches: {} });
        default:
            return state;
    }
}
