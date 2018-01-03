import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function topLiveGameState(
  state = initialState.topLiveGame,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_TOP_LIVE_GAME:
      return Object.assign({}, state, {
        isRefreshingTopLiveGame: true,
        isLoadingTopLiveGame: false,
        isEmptyTopLiveGame: false,
        topLiveGames: []
      });
    case ActionTypes.REQUEST_TOP_LIVE_GAME:
      return Object.assign({}, state, {
        isRefreshingTopLiveGame: false,
        isLoadingTopLiveGame: true,
        isEmptyTopLiveGame: false,
        topLiveGames: []
      });
    case ActionTypes.RECEIVE_TOP_LIVE_GAME:
      return Object.assign({}, state, {
        isRefreshingTopLiveGame: false,
        isLoadingTopLiveGame: false,
        isEmptyTopLiveGame: false,
        topLiveGames: action.topLiveGames
      });
    case ActionTypes.RECEIVE_EMPTY_TOP_LIVE_GAME:
      return Object.assign({}, state, {
        isRefreshingTopLiveGame: false,
        isLoadingTopLiveGame: false,
        isEmptyTopLiveGame: true,
        topLiveGames: []
      });
    default:
      return state;
  }
}
