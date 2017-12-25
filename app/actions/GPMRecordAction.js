import { fetchAPI } from "../utils/fetch";
import { getGPMRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestGPMRecord() {
  return {
    type: ActionTypes.REQUEST_GPM_RECORD
  };
}

function receiveGPMRecord(gpmRecords) {
  return {
    type: ActionTypes.RECEIVE_GPM_RECORD,
    gpmRecords
  };
}

function receiveEmptyAssistsRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_GPM_RECORD
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

export function testFetchGPMRecord() {
  return dispatch => {
    dispatch(requestGPMRecord());

    return getGPMRecord()
      .then(assistsRecords => {
        dispatch(receiveGPMRecord(assistsRecords));
      })
      .catch(error => {
        console.log("Action -TEST FETCH GPM RECORD ERROR - " + error);
        dispatch(receiveEmptyAssistsRecord());
      });
  };
}
