import * as ActionTypes from "../actions/ActionTypes";

export function sendHeroData(heroData) {
  return {
    type: ActionTypes.SEND_HERO_DATA,
    heroData
  };
}