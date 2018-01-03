import { fetchAPI } from "../utils/fetch";
import { getTopLiveGame } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestTopLiveGame() {
  return {
    type: ActionTypes.REQUEST_TOP_LIVE_GAME
  };
}

function refreshingTopLiveGame() {
  return {
    type: ActionTypes.REFRESHING_TOP_LIVE_GAME
  };
}

function receiveTopLiveGame(topLiveGames) {
  return {
    type: ActionTypes.RECEIVE_TOP_LIVE_GAME,
    topLiveGames
  };
}

function receiveEmptyTopLiveGame() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_TOP_LIVE_GAME
  };
}

export function fetchTopLiveGame(refreshing = false) {
  var endpoint = "live";
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingTopLiveGame());
    } else {
      dispatch(requestTopLiveGame());
    }

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveTopLiveGame(json));
      })
      .catch(error => {
        console.log("Action - FETCH TOP LIVE GAME ERROR - " + error);
        dispatch(receiveEmptyTopLiveGame());
      });
  };
}

export function testFetchTopLiveGame() {
  return dispatch => {
    dispatch(requestTopLiveGame());

    return getTopLiveGame()
      .then(topLiveGames => {
        dispatch(receiveTopLiveGame(topLiveGames));
      })
      .catch(error => {
        console.log("Action -TEST FETCH TOP LIVE GAME ERROR - " + error);
        dispatch(receiveEmptyTopLiveGame());
      });
  };
}
