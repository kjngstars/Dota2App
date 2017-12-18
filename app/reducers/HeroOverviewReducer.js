import initialState from './InitialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function heroStatReducer(state = initialState.heroData, action = {}) {
    switch(action.type) {
        case ActionTypes.SEND_HERO_DATA:            
            return Object.assign({}, state, action.heroData);
        default:
            return state;
    }
}
