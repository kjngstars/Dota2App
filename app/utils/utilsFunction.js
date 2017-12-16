import moment from "moment";

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
};
