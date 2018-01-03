import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function matchDetailsState(
  state = initialState.matchDetails,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingMatchDetails: true,
        isLoadingMatchDetails: false,
        isEmptyMatchDetails: false,
        matchDetails: {}
      });
    case ActionTypes.REQUEST_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingMatchDetails: false,
        isLoadingMatchDetails: true,
        isEmptyMatchDetails: false,
        matchDetails: {}
      });
    case ActionTypes.RECEIVE_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingMatchDetails: false,
        isLoadingMatchDetails: false,
        isEmptyMatchDetails: false,
        matchDetails: action.matchDetails
      });
    case ActionTypes.RECEIVE_EMPTY_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingMatchDetails: false,
        isLoadingMatchDetails: false,
        isEmptyMatchDetails: true,
        matchDetails: {}
      });
    default:
      return state;
  }
}
