import moment from "moment";
import { getHeroImage } from "../utils/getHeroImage";

export function createGroupedArray(arr, chunkSize) {
  var groups = [];
  if (!arr) return groups;
  for (let i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}

export function splitStringToInt(str, separator) {
  let arr = new Array();
  arr = str.split(separator);

  for (p in arr) {
    arr[p] = parseInt(arr[p], 10);
  }

  return arr;
}

export function round(number, precision) {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export function getGetOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function processRecord(records) {
  let processedData = [];

  for (let i = 0; i < records.length; i++) {
    let record = records[i];
    let processedRecord = {};

    processedRecord.matchId = record["match_id"];

    let friendlyEndedTime = moment.unix(record["start_time"]).fromNow();
    processedRecord.endedTime = friendlyEndedTime;
    processedRecord.rank = getGetOrdinal(i + 1);

    if (record["hero_id"]) {
      processedRecord.heroImg = getHeroImage(record["hero_id"]);
      processedRecord.heroId = record["hero_id"];
      processedRecord.score = record["score"];
    } else {
      let duration = moment("1900-01-01 00:00:00")
        .add(record["score"], "seconds")
        .format("HH:mm:ss");
      processedRecord.score = duration;
    }

    processedData[i] = processedRecord;
  }

  return processedData;
}

export function reduceText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  } else {
    return text;
  }
}


export function getSideImage(side) {
  let sideImage = (sideImage = require("../assets/radiant.png"));
  if (side == "dire") sideImage = require("../assets/dire.png");
  return sideImage;
}