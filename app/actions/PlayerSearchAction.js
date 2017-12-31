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

//https://api.opendota.com/api/search?q=miracle
//https://api.opendota.com/api/proPlayers?
export function fetchPlayers(keyword = "") {
  return dispatch => {
    if (keyword == "") {
      const endpoint = "proPlayers";

      dispatch(requestPlayers());

      return fetchAPI(endpoint)
        .then(json => {
          dispatch(receiveProPlayers(json));
        })
        .catch(error => {
          console.log("Action - FETCH PRO PLAYERS ERROR - " + error);
          dispatch(receiveEmptyPlayers());
        });
    } else {
      dispatch(requestPlayers());

      const endpoint1 = "proPlayers";
      const endpoint2 = "search?q=" + keyword;

      let p1 = fetchAPI(endpoint1);
      let p2 = fetchAPI(endpoint2);

      return Promise.all([p1, p2])
        .then(values => {
          dispatch(receivePlayers(values));
        })
        .catch(error => {
          console.log("Action - FETCH PLAYERS ERROR - " + error);
          dispatch(receiveEmptyPlayers());
        });
    }
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
