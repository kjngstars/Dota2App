import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function playerInfoState(
  state = initialState.playerInfo,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_PLAYER_INFO:
      return Object.assign({}, state, {
        isRefreshingPlayerInfo: true,
        isLoadingPlayerInfo: false,
        isEmptyPlayerInfo: false,
        playerInfo: []
      });
    case ActionTypes.REQUEST_PLAYER_INFO:
      return Object.assign({}, state, {
        isRefreshingPlayerInfo: false,
        isLoadingPlayerInfo: true,
        isEmptyPlayerInfo: false,
        playerInfo: []
      });
    case ActionTypes.RECEIVE_PLAYER_INFO:
      return Object.assign({}, state, {
        isRefreshingPlayerInfo: false,
        isLoadingPlayerInfo: false,
        isEmptyPlayerInfo: false,
        playerInfo: action.playerInfo
      });
    case ActionTypes.RECEIVE_EMPTY_PLAYER_INFO:
      return Object.assign({}, state, {
        isRefreshingPlayerInfo: false,
        isLoadingPlayerInfo: false,
        isEmptyPlayerInfo: true,
        playerInfo: []
      });
    default:
      return state;
  }
}
