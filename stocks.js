const readline = require('readline');
const tickers = require('./tickers');
let count = 0, columnwidth = 20, rows = 30;
let startTime = Date.now();
let randchars = ['*','%','$','&','@','!','^','~','+','?','/','|','<','>'];
console.clear();
function drawScreen() {
  for (i = 0; i < tickers.length; i++) {
    let k = Math.floor(i / rows);
    readline.cursorTo(process.stdout, k*columnwidth, i-rows*k);
    let dashes = "-".repeat(columnwidth - tickers[i].length)
    process.stdout.write(`\x1b[33m${tickers[i]}${dashes}`);
  }};
drawScreen();
readline.cursorTo(process.stdout,0,40);
console.log(" ");
setInterval(grab, 500);
async function grab() {
  for (const singleticker of tickers) {
    const res1 = await fetch(`https://generic709.herokuapp.com/stockc/${singleticker}`)
    let quote;
    try {quote = await res1.json();} 
    catch (e) {console.log(e);return;};
    if (count % 250 == 0 && count > 1) {
      readline.cursorTo(process.stdout,3,45)
      process.stdout.write(`Data Received: ${count}`);
      let endTime = Date.now();
      readline.cursorTo(process.stdout,3,46)
      let seconds = parseInt((((endTime - startTime) / 1000) % 60),10)
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      process.stdout.write(`Time Elapsed: ${(Math.floor(((endTime - startTime) / 1000)/60))}:${seconds}`);
      readline.cursorTo(process.stdout,3,47)
      process.stdout.write(`Rate: ${parseInt(count / ((endTime - startTime) / 1000),10)}x`);}
    if (!quote) {return;}
    let xposition = 7 + Math.floor(tickers.indexOf(singleticker) / rows) * columnwidth;
    readline.cursorTo(process.stdout,xposition, tickers.indexOf(singleticker) % rows);
    process.stdout.write(`\x1b[37m${quote.price.toFixed(2)}${randchars[Math.floor(Math.random() * 10)]}`);
    count++;}}