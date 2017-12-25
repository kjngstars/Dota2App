import { fetchAPI } from "../utils/fetch";
import { getKillsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestKillsRecord() {
  return {
    type: ActionTypes.REQUEST_KILLS_RECORD
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
