import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function killsRecordState(state = initialState.deathsRecord, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_DEATHS_RECORD:            
            return Object.assign({}, state, { isLoadingDeathsRecord: true, isEmptyDeathsRecord: false, deathsRecords: {} });
        case ActionTypes.RECEIVE_DEATHS_RECORD:
            return Object.assign({}, state, { isLoadingDeathsRecord: false, isEmptyDeathsRecord: false, deathsRecords: action.deathsRecords });
        case ActionTypes.RECEIVE_EMPTY_DEATHS_RECORD:
            return Object.assign({}, state, { isLoadingDeathsRecord: false, isEmptyDeathsRecord: true, deathsRecords: {} });
        default:
            return state;
    }
}
