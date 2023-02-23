const { cursorTo } = require('readline');

function moveCursorAndWrite(xPos, yPos, text = '') {
  cursorTo(process.stdout, xPos, yPos);
  process.stdout.write(text);
}

exports.moveCursorAndWrite = moveCursorAndWrite;
