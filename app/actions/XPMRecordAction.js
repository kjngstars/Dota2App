import { fetchAPI } from "../utils/fetch";
import { getXPMRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestXPMRecord() {
  return {
    type: ActionTypes.REQUEST_XPM_RECORD
  };
}

function refreshingXPMRecord() {
  return {
    type: ActionTypes.REFRESHING_XPM_RECORD
  };
}

function receiveXPMRecord(xpmRecords) {
  return {
    type: ActionTypes.RECEIVE_XPM_RECORD,
    xpmRecords
  };
}

function receiveEmptyXPMRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_XPM_RECORD
  };
}

export function fetchXPMRecord(refreshing = false) {
  var endpoint = "records/xp_per_min";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingXPMRecord());
    } else {
      dispatch(requestXPMRecord());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveXPMRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH XPM RECORD ERROR - " + error);
        dispatch(receiveEmptyXPMRecord());
      });
  };
}

export function testFetchXPMRecord() {
  return dispatch => {
    dispatch(requestXPMRecord());

    return getXPMRecord()
      .then(xpmRecords => {
        dispatch(receiveXPMRecord(xpmRecords));
      })
      .catch(error => {
        console.log("Action -TEST FETCH XPM RECORD ERROR - " + error);
        dispatch(receiveEmptyXPMRecord());
      });
  };
}
