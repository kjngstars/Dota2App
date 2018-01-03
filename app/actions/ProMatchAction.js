import { fetchAPI } from "../utils/fetch";
import { getListProMatch } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestProMatchDetails() {
  return {
    type: ActionTypes.REQUEST_PROMATCH_DETAILS
  };
}

function refreshingProMatchDetails() {
  return {
    type: ActionTypes.REFRESHING_PROMATCH_DETAILS
  };
}

function receiveProMatchDetails(proMatches) {
  return {
    type: ActionTypes.RECEIVE_PROMATCH_DETAILS,
    proMatches
  };
}

function receiveEmptyProMatchDetails() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_PROMATCH_DETAILS
  };
}

//https://api.opendota.com/api/proMatches
export function fetchProMatches(refreshing = false) {
  var endpoint = "proMatches";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingProMatchDetails());
    } else {
      dispatch(requestProMatchDetails());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveProMatchDetails(json));
      })
      .catch(error => {
        console.log("Action - FETCH PRO MATCHES ERROR - " + error);
        dispatch(receiveEmptyProMatchDetails());
      });
  };
}

export function testFetchProMatches() {
  return dispatch => {
    dispatch(requestProMatchDetails());

    return getListProMatch()
      .then(data => {
        dispatch(receiveProMatchDetails(data));
      })
      .catch(error => {
        console.log("Action -TEST FETCH PRO MATCHES ERROR - " + error);
        dispatch(receiveEmptyProMatchDetails());
      });
  };
}
