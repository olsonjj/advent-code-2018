const fs = require('fs');
const _ = require('lodash');

let results = [];

fs.readFile('day1/input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log('error reading', err);
    return;
  }

  const lines = data.split('\n');

  let result = 0;

  lines.map(line => {
    if (line) {
      result += eval(line);
    }
  });

  console.log(result);

  console.log('----------------------');
  console.time('dup check');
  let dupFound = false;
  let loopCount = 0;
  const len = lines.length;
  let newResult = 0;
  while (!dupFound && loopCount < 500) {
    for (var i = 0; i < len; i++) {
      newResult += eval(lines[i]);
      if (results.indexOf(newResult) == -1) {
        results.push(newResult);
      } else {
        dupFound = true;
        console.log('DUP FOUND!!', newResult);
        console.timeEnd('dup check');
        break;
      }
    }
    // console.log('loop #' + loopCount, 'current results?', newResult);
    loopCount++;
  }
});
