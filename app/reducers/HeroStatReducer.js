import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function heroStatReducer(state = initialState.heroStats, action = {}) {
    switch(action.type) {
        case ActionTypes.REQUEST_HERO_STATS:            
            return Object.assign({}, state, { isLoadingHeroStats: true, isEmptyHeroStats: false, heroStats: [] });
        case ActionTypes.RECEIVE_HERO_STATS:
            return Object.assign({}, state, { isLoadingHeroStats: false, isEmptyHeroStats: false, heroStats: action.heroStats });
        case ActionTypes.RECEIVE_EMPTY_HERO_STATS:
            return Object.assign({}, state, { isLoadingHeroStats: false, isEmptyHeroStats: true, heroStats: [] });
        default:
            return state;
    }
}
