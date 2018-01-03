import { fetchAPI } from "../utils/fetch";
import { getDeathsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestDeathsRecord() {
  return {
    type: ActionTypes.REQUEST_DEATHS_RECORD
  };
}

function refreshingDeathsRecord() {
  return {
    type: ActionTypes.REFRESHING_DEATHS_RECORD
  };
}

function receiveDeathsRecord(deathsRecords) {
  return {
    type: ActionTypes.RECEIVE_DEATHS_RECORD,
    deathsRecords
  };
}

function receiveEmptyDeathsRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_KILLS_RECORD
  };
}

export function fetchDeathsRecord(refreshing = false) {
  var endpoint = "records/deaths";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingDeathsRecord());
    } else {
      dispatch(requestDeathsRecord());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveDeathsRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH MATCH DETAILS ERROR - " + error);
        dispatch(receiveEmptyDeathsRecord());
      });
  };
}

export function testFetchDeathsRecord() {
  return dispatch => {
    dispatch(requestDeathsRecord());

    return getDeathsRecord()
      .then(killsRecords => {
        dispatch(receiveDeathsRecord(killsRecords));
      })
      .catch(error => {
        console.log("Action -TEST FETCH KILLS RECORD ERROR - " + error);
        dispatch(receiveEmptyDeathsRecord());
      });
  };
}
