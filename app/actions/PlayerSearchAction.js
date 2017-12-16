import { fetchAPI } from "../utils/fetch";
import {
  getListProMatch,
  getListPublicMatch,
  searchPlayer,
  searchProPlayer
} from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestPlayers() {
  return {
    type: ActionTypes.REQUEST_PLAYERS
  };
}

function receivePlayers(playerResults) {
  return {
    type: ActionTypes.RECEIVE_PLAYERS,
    playerResults
  };
}

function receiveProPlayers(proPlayers) {
  return {
    type: ActionTypes.RECEIVE_PRO_PLAYERS,
    proPlayers
  };
}

function receiveEmptyPlayers() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_PLAYERS
  };
}

export function fetchPlayers(matchId) {
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

export function testFetchPlayers(keyword = "") {
  return dispatch => {
    if (keyword == "") {
      dispatch(requestPlayers());
      return searchProPlayer()
        .then(proPlayers => {
          dispatch(receiveProPlayers(proPlayers));
        })
        .catch(error => {
          console.log("Action -TEST FETCH PRO PLAYERS ERROR - " + error);
          dispatch(receiveEmptyPlayers());
        });
    } else {
      dispatch(requestPlayers());

      let r1 = searchProPlayer();
      let r2 = searchPlayer();

      return Promise.all([r1, r2])
        .then(values => {
          dispatch(receivePlayers(values));
        })
        .catch(error => {
          console.log("Action -TEST FETCH PLAYERS ERROR - " + error);
          dispatch(receiveEmptyPlayers());
        });
    }
  };
}
