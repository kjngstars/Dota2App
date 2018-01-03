import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function xpmRecordState(
  state = initialState.xpmRecord,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_XPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingXPMRecord: true,
        isLoadingXPMRecord: false,
        isEmptyXPMRecord: false,
        xpmRecords: {}
      });
    case ActionTypes.REQUEST_XPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingXPMRecord: false,
        isLoadingXPMRecord: true,
        isEmptyXPMRecord: false,
        xpmRecords: {}
      });
    case ActionTypes.RECEIVE_XPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingXPMRecord: false,
        isLoadingXPMRecord: false,
        isEmptyXPMRecord: false,
        xpmRecords: action.xpmRecords
      });
    case ActionTypes.RECEIVE_EMPTY_XPM_RECORD:
      return Object.assign({}, state, {
        isRefreshingXPMRecord: false,
        isLoadingXPMRecord: false,
        isEmptyXPMRecord: true,
        xpmRecords: {}
      });
    default:
      return state;
  }
}
