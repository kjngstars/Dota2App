import { fetchAPI } from "../utils/fetch";
import { getDurationRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestDurationRecord() {
  return {
    type: ActionTypes.REQUEST_DURATION_RECORD
  };
}

function receiveDurationRecord(durationRecords) {
  return {
    type: ActionTypes.RECEIVE_DURATION_RECORD,
    durationRecords
  };
}

function receiveEmptyDurationRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_DURATION_RECORD
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

export function testFetchDurationRecord() {
  return dispatch => {
    dispatch(requestDurationRecord());

    return getDurationRecord()
      .then(durationRecord => {
        dispatch(receiveDurationRecord(durationRecord));
      })
      .catch(error => {
        console.log("Action -TEST FETCH DURATION RECORD ERROR - " + error);
        dispatch(receiveEmptyDurationRecord());
      });
  };
}
