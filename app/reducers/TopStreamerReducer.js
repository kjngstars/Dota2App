import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function topStreamerState(
  state = initialState.topStreamer,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_TOP_STREAMER:
      return Object.assign({}, state, {
        isRefreshingTopStreamer: true,
        isLoadingTopStreamer: false,
        isEmptyTopStreamer: false,
        topStreamers: {}
      });
    case ActionTypes.REQUEST_TOP_STREAMER:
      return Object.assign({}, state, {
        isRefreshingTopStreamer: false,
        isLoadingTopStreamer: true,
        isEmptyTopStreamer: false,
        topStreamers: {}
      });
    case ActionTypes.RECEIVE_TOP_STREAMER:
      return Object.assign({}, state, {
        isRefreshingTopStreamer: false,
        isLoadingTopStreamer: false,
        isEmptyTopStreamer: false,
        topStreamers: action.topStreamers
      });
    case ActionTypes.RECEIVE_EMPTY_TOP_STREAMER:
      return Object.assign({}, state, {
        isRefreshingTopStreamer: false,
        isLoadingTopStreamer: false,
        isEmptyTopStreamer: true,
        topStreamers: {}
      });
    default:
      return state;
  }
}
