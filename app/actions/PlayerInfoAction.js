import { fetchAPI } from "../utils/fetch";
import { getAssistsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestPlayerInfo() {
  return {
    type: ActionTypes.REQUEST_PLAYER_INFO
  };
}

function refreshingPlayerInfo() {
  return {
    type: ActionTypes.REFRESHING_PLAYER_INFO
  };
}

function receivePlayerInfo(playerInfo) {
  return {
    type: ActionTypes.RECEIVE_PLAYER_INFO,
    playerInfo
  };
}

function receiveEmptyPlayerInfo() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_PLAYER_INFO
  };
}

export function fetchPlayerInfo(accountId, refreshing = false) {
  var endpoint = "players/" + accountId;
  return dispatch => {
    if (refreshing) {
      dispatch(refreshingPlayerInfo());
    } else {
      dispatch(requestPlayerInfo());
    }

    const endpoint1 = "players/" + accountId;
    const endpoint2 = "players/" + accountId + "/wl";

    const p1 = fetchAPI(endpoint1);
    const p2 = fetchAPI(endpoint2);

    return Promise.all([p1, p2])
      .then(values => {
        dispatch(receivePlayerInfo(values));
      })
      .catch(error => {
        console.log("Action - FETCH PLAYER INFO ERROR - " + error);
        dispatch(receiveEmptyPlayerInfo());
      });
  };
}
