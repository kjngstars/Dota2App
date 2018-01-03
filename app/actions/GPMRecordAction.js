import { fetchAPI } from "../utils/fetch";
import { getGPMRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestGPMRecord() {
  return {
    type: ActionTypes.REQUEST_GPM_RECORD
  };
}

function refreshingGPMRecord() {
  return {
    type: ActionTypes.REFRESHING_GPM_RECORD
  };
}

function receiveGPMRecord(gpmRecords) {
  return {
    type: ActionTypes.RECEIVE_GPM_RECORD,
    gpmRecords
  };
}

function receiveEmptyGPMRecord() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_GPM_RECORD
  };
}

export function fetchGPMRecord(refreshing = false) {
  var endpoint = "records/gold_per_min";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingGPMRecord());
    } else {
      dispatch(requestGPMRecord());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveGPMRecord(json));
      })
      .catch(error => {
        console.log("Action - FETCH GPM RECORD ERROR - " + error);
        dispatch(receiveEmptyGPMRecord());
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
        dispatch(receiveEmptyGPMRecord());
      });
  };
}
