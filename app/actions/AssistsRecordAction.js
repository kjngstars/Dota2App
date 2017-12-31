import { fetchAPI } from "../utils/fetch";
import { getAssistsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestAssistsRecord() {
  return {
    type: ActionTypes.REQUEST_ASSISTS_RECORD
  };
}

function receiveAssistsRecord(assistsRecords) {
  return {
    type: ActionTypes.RECEIVE_ASSISTS_RECORD,
    assistsRecords
  };
}

function receiveEmptyAssistsRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_ASSISTS_RECORD
  };
}

export function fetchAssistsRecord() {
  var endpoint = "records/assists";
  return dispatch => {
    dispatch(requestAssistsRecord());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveAssistsRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH ASSIST RECORD ERROR - " + error);
        dispatch(receiveEmptyAssistsRecord());
      });
  };
}

export function testFetchAssistsRecord() {
  return dispatch => {
    dispatch(requestAssistsRecord());

    return getAssistsRecord()
      .then(assistsRecords => {
        dispatch(receiveAssistsRecord(assistsRecords));
      })
      .catch(error => {
        console.log("Action -TEST FETCH ASSIST RECORD ERROR - " + error);
        dispatch(receiveEmptyAssistsRecord());
      });
  };
}
