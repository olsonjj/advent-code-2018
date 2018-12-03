const fs = require('fs');
const _ = require('lodash');

let lines = [];
let twoCount = 0;
let threeCount = 0;

fs.readFile('day2/input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log('error reading', err);
    return;
  }

  lines = data.split('\n');

  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];
    returnCheckSum(line.split(''));
  }

  console.log('CHECKSUM ', twoCount * threeCount);

  // find almost match lines, except they differ by two characters in same position
  const comp1 = [...lines];
  const comp2 = [...lines];
  comp1.map(line => {
    comp2.map(line2 => {
      const ar1 = line.split('');
      const ar2 = line2.split('');
      const diff = _.difference(ar1, ar2);

      if (line !== line2 && diff.length === 1) {
        //console.log('found diff only 1', diff, line, line2);
        let ar3 = [...ar2];
        const pos = ar1.indexOf(diff[0]);
        ar3[pos] = diff[0];

        if (ar1.join('') === ar3.join('')) {
          const common = ar1.join('');
          const newString =
            common.substring(0, pos) + common.substring(pos + 1);
          console.log('MATCH', newString);
        }
      }
    });
  });
});

function returnCheckSum(arr) {
  const ct = _.countBy(arr);
  let twoFound = false;
  let threeFound = false;
  for (key in ct) {
    //console.log(key, ct[key]);
    const val = ct[key];
    if (val === 2) {
      twoFound = true;
    } else if (val === 3) {
      threeFound = true;
    }
  }

  if (twoFound) {
    twoCount++;
  }
  if (threeFound) {
    threeCount++;
  }
}
