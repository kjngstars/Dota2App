import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function heroStatReducer(
  state = initialState.heroRanking,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_HERO_RANKING:
      return Object.assign({}, state, {
        isRefreshingHeroRanking: true,
        isLoadingHeroRanking: false,
        isEmptyHeroRanking: false,
        heroRanking: []
      });
    case ActionTypes.REQUEST_HERO_RANKING:
      return Object.assign({}, state, {
        isRefreshingHeroRanking: false,
        isLoadingHeroRanking: true,
        isEmptyHeroRanking: false,
        heroRanking: []
      });
    case ActionTypes.RECEIVE_HERO_RANKING:
      return Object.assign({}, state, {
        isRefreshingHeroRanking: false,
        isLoadingHeroRanking: false,
        isEmptyHeroRanking: false,
        heroRanking: action.heroRanking.rankings
      });
    case ActionTypes.RECEIVE_EMPTY_HERO_RANKING:
      return Object.assign({}, state, {
        isRefreshingHeroRanking: false,
        isLoadingHeroRanking: false,
        isEmptyHeroRanking: true,
        heroRanking: []
      });
    default:
      return state;
  }
}
