import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function durationRecordState(state = initialState.durationRecord, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_DURATION_RECORD:            
            return Object.assign({}, state, { isLoadingDurationRecord: true, isEmptyDurationRecord: false, durationRecords: {} });
        case ActionTypes.RECEIVE_DURATION_RECORD:
            return Object.assign({}, state, { isLoadingDurationRecord: false, isEmptyDurationRecord: false, durationRecords: action.durationRecords });
        case ActionTypes.RECEIVE_EMPTY_DURATION_RECORD:
            return Object.assign({}, state, { isLoadingDurationRecord: false, isEmptyDurationRecord: true, durationRecords: {} });
        default:
            return state;
    }
}
