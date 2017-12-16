import { fetchAPI } from "../utils/fetch";
import { getHeroStats } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestHeroStats() {
  return {
    type: ActionTypes.REQUEST_HERO_STATS
  };
}

function receiveHeroStats(heroStats) {
  return {
    type: ActionTypes.RECEIVE_HERO_STATS,
    heroStats
  };
}

function receiveEmptyHeroStats() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_HERO_STATS
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

export function testFetchHeroStats() {
  return dispatch => {
    dispatch(requestHeroStats());

    return getHeroStats()
      .then(heroStats => {
        dispatch(receiveHeroStats(heroStats));
      })
      .catch(error => {
        console.log("Action -TEST FETCH HERO STATS ERROR - " + error);
        dispatch(receiveEmptyHeroStats());
      });
  };
}
