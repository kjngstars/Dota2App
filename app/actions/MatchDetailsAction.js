import { fetchAPI } from "../utils/fetch";
import getMatchData from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestMatchDetails() {
  return {
    type: ActionTypes.REQUEST_MATCH_DETAILS
  };
}

function receiveMatchDetails(matchDetails) {
  return {
    type: ActionTypes.RECEIVE_MATCH_DETAILS,
    matchDetails
  };
}

function receiveEmptyMatchDetails() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_MATCH_DETAILS
  };
}

export function fetchMatchDetails(matchId) {
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

export function testFetchMatchDetails(matchId) {
  return dispatch => {
    dispatch(requestMatchDetails());

    return getMatchData(matchId)
      .then(data => {
        dispatch(receiveMatchDetails(data));
      })
      .catch(error => {
        console.log("Action -TEST FETCH MATCH DETAILS ERROR - " + error);
        dispatch(receiveEmptyMatchDetails());
      });
  };
}
