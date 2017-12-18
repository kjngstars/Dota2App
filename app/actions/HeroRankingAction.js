import { fetchAPI } from "../utils/fetch";
import { getHeroRanking } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestHeroRanking() {
  return {
    type: ActionTypes.REQUEST_HERO_RANKING
  };
}

function receiveHeroRanking(heroRanking) {
  return {
    type: ActionTypes.RECEIVE_HERO_RANKING,
    heroRanking
  };
}

function receiveEmptyHeroRanking() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_HERO_RANKING
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

export function testFetchHeroRanking() {
  return dispatch => {
    dispatch(requestHeroRanking());

    return getHeroRanking()
      .then(heroRanking => {
        dispatch(receiveHeroRanking(heroRanking));
      })
      .catch(error => {
        console.log("Action -TEST FETCH HERO RANKING ERROR - " + error);
        dispatch(receiveEmptyHeroRanking());
      });
  };
}
