import { fetchAPI } from "../utils/fetch";
import { getListProMatch, getListPublicMatch } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestLowMMRMatchDetails() {
  return {
    type: ActionTypes.REQUEST_LOW_MMR_MATCH_DETAILS
  };
}

function receiveLowMMRMatchDetails(lowMMRMatches) {
  return {
    type: ActionTypes.RECEIVE_LOW_MMR_MATCH_DETAILS,
    lowMMRMatches
  };
}

function receiveEmptyLowMMRMatchDetails() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_LOW_MMR_MATCH_DETAILS
  };
}

//https://api.opendota.com/api/publicMatches?mmr_ascending=1
export function fetchLowMMRMatches(matchId) {
  var endpoint = "/publicMatches?mmr_ascending=1";
  return dispatch => {
    dispatch(requestLowMMRMatchDetails());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveLowMMRMatchDetails(json));
      })
      .catch(error => {
        console.log("Action - FETCH LOW MMR MATCHES ERROR - " + error);
        dispatch(receiveEmptyLowMMRMatchDetails());
      });
  };
}

export function testFetchLowMMRMatches(sort) {
  return dispatch => {
    dispatch(requestLowMMRMatchDetails());

    return getListPublicMatch(sort)
      .then(data => {
        dispatch(receiveLowMMRMatchDetails(data));
      })
      .catch(error => {
        console.log("Action -TEST FETCH LOW MMR MATCHES ERROR - " + error);
        dispatch(receiveEmptyLowMMRMatchDetails());
      });
  };
}
