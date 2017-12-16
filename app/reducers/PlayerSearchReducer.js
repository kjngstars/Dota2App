import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function matchDetailsState(
  state = initialState.playerSearchResults,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REQUEST_PLAYERS:
      return Object.assign({}, state, {
        isSearchingPlayers: true,
        isEmptyPlayerResults: false,
        playerResults: []
      });
    case ActionTypes.RECEIVE_PLAYERS:
      return Object.assign({}, state, {
        isSearchingPlayers: false,
        isEmptyPlayerResults: false,
        playerResults: action.playerResults
      });
    case ActionTypes.RECEIVE_PRO_PLAYERS:
      return Object.assign({}, state, {
        isSearchingPlayers: false,
        isEmptyPlayerResults: false,
        playerResults: [action.proPlayers, []]
      });
    case ActionTypes.RECEIVE_EMPTY_PLAYERS:
      return Object.assign({}, state, {
        isSearchingPlayers: false,
        isEmptyPlayerResults: true,
        playerResults: []
      });
    default:
      return state;
  }
}
