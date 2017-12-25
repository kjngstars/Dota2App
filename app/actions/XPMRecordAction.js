import { fetchAPI } from "../utils/fetch";
import { getXPMRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestXPMRecord() {
  return {
    type: ActionTypes.REQUEST_XPM_RECORD
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

export function fetchDurationRecord(matchId) {
  var endpoint = "matches/" + matchId;
  return dispatch => {
    dispatch(requestMatchDetails());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveMatchDetails(json));
      })
      .catch(error => {
        console.log("Action - FETCH MATCH DETAILS ERROR - " + error);
        dispatch(receiveEmptyMatchDetails());
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
