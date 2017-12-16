import { fetchAPI } from "../utils/fetch";
import { getListProMatch, getListPublicMatch } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestHighMMRMatchDetails() {
  return {
    type: ActionTypes.REQUEST_HIGHMMR_MATCH_DETAILS
  };
}

function receiveHighMMRMatchDetails(highMMRMatches) {
  return {
    type: ActionTypes.RECEIVE_HIGHMMR_MATCH_DETAILS,
    highMMRMatches
  };
}

function receiveEmptyHighMMRMatchDetails() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_HIGHMMR_MATCH_DETAILS
  };
}

export function fetchHighMMRMatches(matchId) {
  var endpoint = "matches/" + matchId;
  return dispatch => {
    dispatch(requestHighMMRMatchDetails());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveHighMMRMatchDetails(json));
      })
      .catch(error => {
        console.log("Action - FETCH PUBLIC MATCH DETAILS ERROR - " + error);
        dispatch(receiveEmptyHighMMRMatchDetails());
      });
  };
}

export function testFetchHighMMRMatches(sort) {
  return dispatch => {
    dispatch(requestHighMMRMatchDetails());

    return getListPublicMatch(sort)
      .then(data => {
        dispatch(receiveHighMMRMatchDetails(data));
      })
      .catch(error => {
        console.log("Action -TEST FETCH HIGH MMR MATCHES ERROR - " + error);
        dispatch(receiveEmptyHighMMRMatchDetails());
      });
  };
}
