import { fetchAPI } from "../utils/fetch";
import { getAssistsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestPlayerInfo() {
  return {
    type: ActionTypes.REQUEST_PLAYER_INFO
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

export function fetchPlayerInfo(accountId) {
  var endpoint = "players/" + accountId;
  return dispatch => {
    dispatch(requestPlayerInfo());

    var jsonData;
    return fetchAPI(endpoint)
      .then(json => {        
        dispatch(receivePlayerInfo(json));
      })
      .catch(error => {
        console.log("Action - FETCH PLAYER INFO ERROR - " + error);
        dispatch(receiveEmptyPlayerInfo());
      });
  };
}