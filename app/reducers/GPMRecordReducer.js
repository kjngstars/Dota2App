import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function gpmRecordState(state = initialState.gpmRecord, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_GPM_RECORD:            
            return Object.assign({}, state, { isLoadingGPMRecord: true, isEmptyGPMRecord: false, gpmRecords: {} });
        case ActionTypes.RECEIVE_GPM_RECORD:
            return Object.assign({}, state, { isLoadingGPMRecord: false, isEmptyGPMRecord: false, gpmRecords: action.gpmRecords });
        case ActionTypes.RECEIVE_EMPTY_GPM_RECORD:
            return Object.assign({}, state, { isLoadingGPMRecord: false, isEmptyGPMRecord: true, gpmRecords: {} });
        default:
            return state;
    }
}
