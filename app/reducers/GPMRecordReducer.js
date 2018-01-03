import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function gpmRecordState(
  state = initialState.gpmRecord,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_GPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingGPMRecord: true,
        isLoadingGPMRecord: false,
        isEmptyGPMRecord: false,
        gpmRecords: {}
      });
    case ActionTypes.REQUEST_GPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingGPMRecord: false,
        isLoadingGPMRecord: true,
        isEmptyGPMRecord: false,
        gpmRecords: {}
      });
    case ActionTypes.RECEIVE_GPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingGPMRecord: false,
        isLoadingGPMRecord: false,
        isEmptyGPMRecord: false,
        gpmRecords: action.gpmRecords
      });
    case ActionTypes.RECEIVE_EMPTY_GPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingGPMRecord: false,
        isLoadingGPMRecord: false,
        isEmptyGPMRecord: true,
        gpmRecords: {}
      });
    default:
      return state;
  }
}
