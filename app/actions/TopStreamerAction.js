import { fetchAPI } from "../utils/fetch";
import { getAssistsRecord } from "../test/testApi";
import * as ActionTypes from "../actions/ActionTypes";

function requestTopStreamer() {
  return {
    type: ActionTypes.REQUEST_TOP_STREAMER
  };
}

function receiveTopStreamer(topStreamers) {
  return {
    type: ActionTypes.RECEIVE_TOP_STREAMER,
    topStreamers
  };
}

function receiveEmptyTopStreamer() {
  return {
    type: ActionTypes.RECEIVE_EMPTY_TOP_STREAMER
  };
}

export function fetchTopStreamer(matchId) {
  const endpoint = "https://api.twitch.tv/kraken/streams/?game=Dota+2&limit=5";
  const clientId = "375i76dug5xiofpygmsaj6u14dh63o";

  return dispatch => {
    dispatch(requestTopStreamer());

    return fetch(endpoint, {
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": clientId
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(receiveTopStreamer(json));
      })
      .catch(error => {
        console.log("Action - FETCH TOP STREAMER ERROR - " + error);
        dispatch(receiveEmptyTopStreamer());
      });
  };
}
