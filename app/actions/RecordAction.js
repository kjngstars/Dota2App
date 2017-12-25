import { fetchAPI } from "../utils/fetch";
import { getListProMatch } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

export function fetchProMatches(matchId) {
  var endpoint = "matches/" + matchId;
  return dispatch => {
    dispatch(requestProMatchDetails());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveProMatchDetails(json));
      })
      .catch(error => {
        console.log("Action - FETCH MATCH DETAILS ERROR - " + error);
        dispatch(receiveEmptyProMatchDetails());
      });
  };
}

export function testFetchRecord(field) {
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
