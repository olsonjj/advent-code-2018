const fs = require('fs');
const _ = require('lodash');

let fabric = _.range(1000).map(item => {
  return _.range(1000).map(item => {
    return '.';
  });
});

let lines = [];
let elves = [];

fs.readFile('day3/input.txt', 'utf-8', (err, data) => {
  if (err) {
    return;
  }

  lines = data.split('\n');

  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];
    // #10 @ 452,496: 18x18
    const part1 = line.split('@');
    const elfId = _.trim(part1[0]);
    const part2 = part1[1].split(':');
    const location = _.trim(part2[0]);
    const size = _.trim(part2[1]);
    const x = parseFloat(location.split(',')[0]);
    const y = parseFloat(location.split(',')[1]);
    const w = parseFloat(size.split('x')[0]);
    const h = parseFloat(size.split('x')[1]);
    // console.log(
    //   `elf ${elfId} create patch at ${x},${y} with size of ${w}x${h}`
    // );

    elves.push({ id: elfId, x: x, y: y, w: w, h: h });

    fillFabric(x, y, w, h);
  }

  countFabricOverlap();

  // find clean patch
  checkCleanPatch();
});

function fillFabric(x, y, w, h) {
  const maxI = x + w;
  const maxJ = y + h;

  for (var i = x; i < x + w; i++) {
    for (var j = y; j < y + h; j++) {
      let currentValue = fabric[i][j];
      if (currentValue === '.') {
        fabric[i][j] = '1';
      } else if (currentValue === '1') {
        fabric[i][j] = 'x';
      }
    }
  }
}

function countFabricOverlap() {
  let totalFabricOverlap = 0;

  for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < 1000; j++) {
      const val = fabric[i][j];
      if (val === 'x') {
        totalFabricOverlap += 1;
      }
    }
  }

  console.log('total overlap : ' + totalFabricOverlap);
}

function checkCleanPatch() {
  let noHitList = [];
  for (var i = 0; i < elves.length; i++) {
    const elf1 = elves[i];
    let wasHit = false;
    for (var j = 0; j < elves.length; j++) {
      const elf2 = elves[j];

      if (elf1.id === elf2.id) {
        continue;
      }

      const r1 = {
        left: elf1.x,
        right: elf1.x + elf1.w - 1,
        top: elf1.y,
        bottom: elf1.y + elf1.h - 1
      };
      const r2 = {
        left: elf2.x,
        right: elf2.x + elf2.w - 1,
        top: elf2.y,
        bottom: elf2.y + elf2.h - 1
      };

      if (intersectRect(r1, r2)) {
        wasHit = true;
        continue;
      }
    }

    if (!wasHit) {
      noHitList.push(elf1.id);
    }
  }

  console.log('no hit list', noHitList);
}

function intersectRect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
