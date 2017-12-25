import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function killsRecordState(state = initialState.killsRecord, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_KILLS_RECORD:            
            return Object.assign({}, state, { isLoadingKillsRecord: true, isEmptyKillsRecord: false, killsRecords: {} });
        case ActionTypes.RECEIVE_KILLS_RECORD:
            return Object.assign({}, state, { isLoadingKillsRecord: false, isEmptyKillsRecord: false, killsRecords: action.killsRecords });
        case ActionTypes.RECEIVE_EMPTY_KILLS_RECORD:
            return Object.assign({}, state, { isLoadingKillsRecord: false, isEmptyKillsRecord: true, killsRecords: {} });
        default:
            return state;
    }
}
