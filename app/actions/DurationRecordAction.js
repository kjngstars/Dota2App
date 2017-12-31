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

export function fetchDurationRecord() {
  var endpoint = "records/duration";
  return dispatch => {
    dispatch(requestDurationRecord());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveDurationRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH DURATION RECORD ERROR - " + error);
        dispatch(receiveEmptyDurationRecord());
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
