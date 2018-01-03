import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function assistsRecordState(
  state = initialState.assistsRecord,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_REQUEST_ASSISTS_RECORD:
      return Object.assign({}, state, {
        isRefreshingAssistsRecord: true,  
        isLoadingAssistsRecord: false,
        isEmptyAssistsRecord: false,
        assistsRecords: {}
      });
    case ActionTypes.REQUEST_ASSISTS_RECORD:
      return Object.assign({}, state, {
        isRefreshingAssistsRecord: false,
        isLoadingAssistsRecord: true,
        isEmptyAssistsRecord: false,
        assistsRecords: {}
      });
    case ActionTypes.RECEIVE_ASSISTS_RECORD:
      return Object.assign({}, state, {
        isRefreshingAssistsRecord: false,
        isLoadingAssistsRecord: false,
        isEmptyAssistsRecord: false,
        assistsRecords: action.assistsRecords
      });
    case ActionTypes.RECEIVE_EMPTY_ASSISTS_RECORD:
      return Object.assign({}, state, {
        isRefreshingAssistsRecord: false,
        isLoadingAssistsRecord: false,
        isEmptyAssistsRecord: true,
        assistsRecords: {}
      });
    default:
      return state;
  }
}
