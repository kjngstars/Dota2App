import { fetchAPI } from "../utils/fetch";
import { getTopLiveGame } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestTopLiveGame() {
  return {
    type: ActionTypes.REQUEST_TOP_LIVE_GAME
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

export function fetchTopLiveGame(matchId) {
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
