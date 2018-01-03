import { fetchAPI } from "../utils/fetch";
import { getKillsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestKillsRecord() {
  return {
    type: ActionTypes.REQUEST_KILLS_RECORD
  };
}

function refreshingKillsRecord() {
  return {
    type: ActionTypes.REFRESHING_KILLS_RECORD
  };
}

function receiveKillsRecord(killsRecords) {
  return {
    type: ActionTypes.RECEIVE_KILLS_RECORD,
    killsRecords
  };
}

function receiveEmptyKillsRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_KILLS_RECORD
  };
}

export function fetchKillsRecord(refreshing = false) {
  var endpoint = "records/kills";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingKillsRecord());
    } else {
      dispatch(requestKillsRecord());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveKillsRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH KILLS RECORD ERROR - " + error);
        dispatch(receiveEmptyKillsRecord());
      });
  };
}

export function testFetchKillsRecord() {
  return dispatch => {
    dispatch(requestKillsRecord());

    return getKillsRecord()
      .then(killsRecords => {
        dispatch(receiveKillsRecord(killsRecords));
      })
      .catch(error => {
        console.log("Action -TEST FETCH KILLS RECORD ERROR - " + error);
        dispatch(receiveEmptyKillsRecord());
      });
  };
}
