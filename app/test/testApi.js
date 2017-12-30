import matchDetailsError from "./matchdata_error.json";
import matchDetails from "./matchdata.json";
import promatch from "./promatch.json";
import highmmrmatch from "./highmmrmatch.json";
import lowmmrmatch from "./lowmmrmatch.json";
import proplayers from "./proplayers.json";
import searchplayer from "./searchplayer.json";
import herostat from "./herostat.json";
import heroranking from "./heroranking.json";

import record_duration from "./record_duration.json"
import record_kills from "./record_kills.json"
import record_assists from "./record_assists.json"
import record_deaths from "./record_deaths.json"
import record_gpm from "./record_gpm.json"
import record_xpm from "./record_xpm.json"
import record_lh from "./record_lh.json"
import record_dn from "./record_dn.json"
import record_td from "./record_td.json"
import livegame from "./livegame.json";

const delay = 1000;
export const testId = 3558108479;

export default function getMatchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id != testId) {
        resolve(matchDetailsError);
      } else {
        resolve(matchDetails);
      }
    }, delay);
  });
}

export function getListProMatch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(promatch);
    }, delay);
  });
}

//https://api.opendota.com/api/publicMatches?mmr_descending=1
//https://api.opendota.com/api/publicMatches?mmr_ascending=1
export function getListPublicMatch(sort) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = [];
      if (sort === "desc") {
        data = highmmrmatch;
      } else if (sort === "asc") {
        data = lowmmrmatch;
      }

      resolve(data);
    }, delay);
  });
}

export function searchPlayer(keyword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(searchplayer);
    }, delay);
  });
}

export function searchProPlayer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(proplayers);
    }, delay);
  });
}

export function getHeroStats(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(herostat);
    }, delay);
  });
}

//https://api.opendota.com/api/rankings?hero_id=102
export function getHeroRanking(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(heroranking);
    }, delay);
  });
}

//https://api.opendota.com/api/records/{field}
export function getDurationRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_duration);
    }, delay);
  });
}

export function getKillsRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_kills);
    }, delay);
  });
}

export function getDeathsRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_deaths);
    }, delay);
  });
}

export function getAssistsRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_assists);
    }, delay);
  });
}

export function getGPMRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_gpm);
    }, delay);
  });
}

export function getXPMRecord(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(record_xpm);
    }, delay);
  });
}

export function getTopLiveGame(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      resolve(livegame);
    }, delay);
  });
}


