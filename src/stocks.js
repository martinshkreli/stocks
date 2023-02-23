const tickers = require('./tickers');
const { getTicker } = require('./api');
const { moveCursorAndWrite } = require('./utils');

const REFRESH_RATE_MS = 500;
const COLUMN_WIDTH = 20;
const ROW_WIDTH = 30;
const START_TIME = Date.now();
const RAND_CHARS = ['*', '%', '$', '&', '@', '!', '^', '~', '+', '?', '/', '|', '<', '>'];

function drawScreen() {
  tickers.forEach((ticker, idx) => {
    const k = Math.floor(idx / ROW_WIDTH);
    const dashes = '-'.repeat(COLUMN_WIDTH - ticker.length);
    const xPosition = k * COLUMN_WIDTH;
    const yPosition = idx - ROW_WIDTH * k;
    moveCursorAndWrite(xPosition, yPosition, `\x1b[33m${ticker}${dashes}`);
  });
}

async function grab() {
  const tickersData = await Promise.all(tickers.map((ticker) => getTicker(ticker)));
  let count = 0;

  for (const singleticker of tickersData) {
    if (count % 250 === 0 && count > 1) {
      const endTime = Date.now();
      const seconds = parseInt(((endTime - START_TIME) / 1000) % 60, 10);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      moveCursorAndWrite(3, 45, `Data Received: ${count}`);
      moveCursorAndWrite(3, 46, `Time Elapsed: ${Math.floor((endTime - START_TIME) / 1000 / 60)}:${formattedSeconds}`);
      moveCursorAndWrite(3, 47, `Rate: ${parseInt(count / ((endTime - START_TIME) / 1000), 10)}x`);
    }

    const xPosition = 7 + Math.floor(tickersData.indexOf(singleticker) / ROW_WIDTH) * COLUMN_WIDTH;
    const yPosition = tickersData.indexOf(singleticker) % ROW_WIDTH;
    const tickerText = `\x1b[37m${singleticker.price.toFixed(2)}${RAND_CHARS[Math.floor(Math.random() * 10)]}`;
    moveCursorAndWrite(xPosition, yPosition, tickerText);

    count++;
  }
}

console.clear();

drawScreen();
moveCursorAndWrite(0, 40);

setInterval(grab, REFRESH_RATE_MS);
