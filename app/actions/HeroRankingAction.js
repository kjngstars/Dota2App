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

export function fetchHeroRanking(heroId) {
  var endpoint = "rankings?hero_id=" + heroId;
  return dispatch => {
    dispatch(requestHeroRanking());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {
        dispatch(receiveHeroRanking(json));
      })
      .catch(error => {
        console.log(heroId + " Action - FETCH HERO RANKING ERROR - " + error);
        dispatch(receiveEmptyHeroRanking());
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
