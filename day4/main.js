const fs = require('fs');
const _ = require('lodash');

let lines = [];

let guardMap = {};

let firstDateTime = 0;
let lastDateTime = 0;

fs.readFile('day4/input.txt', 'utf-8', (err, data) => {
  if (err) {
    return;
  }

  lines = data.split('\n');
  let list = [];

  const len = lines.length;
  for (var i = 0; i < len; i++) {
    const line = lines[i];
    const dString = line.substring(1, 17);
    const year = dString.substring(0, 4);
    const month = dString.substring(5, 7);
    const day = dString.substring(8, 10);

    const hour = dString.substring(11, 13);
    const minute = dString.substring(14, 16);
    const dateInt = parseInt(year + month + day + minute);

    const action = line.substring(19);
    list.push({ date: dateInt, action: action });
  }

  list.sort((a, b) => {
    if (a.date > b.date) return 1;
    else return -1;
  });

  const first = list[0];
  const last = list[list.length - 1];

  firstDateTime = first.date;
  lastDateTime = last.date;

  mapGuardsAndSleep(list);
  findSleepiestGuard();
  mapTime(list);
});

function mapGuardsAndSleep(list) {
  let currentGuard = null;
  let currentTimestamp = 0;
  list.map(item => {
    const action = item.action;
    // console.log(item);
    const firstChar = action.substring(0, 1);
    if (firstChar === 'G') {
      const parts = item.action.split(' ');
      currentGuard = parts[1].substring(1);
      currentTimestamp = item.date;
      //console.log('Guard Change', currentGuard);
      if (guardMap[currentGuard] === undefined) {
        guardMap[currentGuard] = { time: 0 };
      } else {
        updateGuardSleep(currentGuard, currentTimestamp, item.date);
      }
    } else if (firstChar === 'f') {
      updateGuardSleep(currentGuard, currentTimestamp, item.date);
    } else if (firstChar === 'w') {
    }
  });

  //console.log('Guard Count', guardMap);
}

function updateGuardSleep(guard, last, now) {
  const t2 = now - last;
  const currentTime = guardMap[guard].time + t2;
  guardMap[guard] = { time: currentTime };
}

function findSleepiestGuard() {
  let guardName = null;
  let guardTime = 0;

  for (key in guardMap) {
    const guard = guardMap[key];
    if (guard.time > guardTime) {
      guardName = key;
      guardTime = guard.time;
    }
  }

  console.log(`Sleep Guard: ${guardName} slept for ${guardTime}`);
}

function mapTime(list) {
  console.log(`Map ${firstDateTime} to ${lastDateTime}`);
  for (var i = firstDateTime; i <= lastDateTime; i++) {}
}
