import initialState from "./InitialState";
import * as ActionTypes from "../actions/ActionTypes";

export default function matchDetailsState(
  state = initialState.lowMMRMatches,
  action = {}
) {
  switch (action.type) {
    case ActionTypes.REFRESHING_LOW_MMR_MATCH_DETAILS:
    return Object.assign({}, state, {
      isRefreshingLowMMRMatches: true,
      isLoadingLowMMRMatches: false,
      isEmptyLowMMRMatches: false,
      lowMMRMatches: {}
    });
    case ActionTypes.REQUEST_LOW_MMR_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingLowMMRMatches: false,
        isLoadingLowMMRMatches: true,
        isEmptyLowMMRMatches: false,
        lowMMRMatches: {}
      });
    case ActionTypes.RECEIVE_LOW_MMR_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingLowMMRMatches: false,
        isLoadingLowMMRMatches: false,
        isEmptyLowMMRMatches: false,
        lowMMRMatches: action.lowMMRMatches
      });
    case ActionTypes.RECEIVE_EMPTY_LOW_MMR_MATCH_DETAILS:
      return Object.assign({}, state, {
        isRefreshingLowMMRMatches: false,
        isLoadingLowMMRMatches: false,
        isEmptyLowMMRMatches: true,
        lowMMRMatches: {}
      });
    default:
      return state;
  }
}
