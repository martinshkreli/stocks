import readline from 'readline'
import { fetchTicker, drawScreen } from '@utils'
import config from "@config"
import { Ticker } from '@aliases'
import tickers from "@tickers"

const { SCREEN_ROWS, COLUMN_WIDTH } = config
const startTime = Date.now()
const randChars = ['*', '%', '$', '&', '@', '!', '^', '~', '+', '?', '/', '|', '<', '>']

let count = 0
async function grab(tickers: Ticker[]) {
  for (const ticker of tickers) {
    let quote
    try {
      quote = await fetchTicker(ticker)
    } catch (err) { 
      console.error(err)
      return
    }

    if (!quote) {
      return
    }

    if (count % 250 == 0 && count > 1) {
      readline.cursorTo(process.stdout, 3, 45)
      process.stdout.write(`Data Received: ${count}`)
      let endTime = Date.now()
      readline.cursorTo(process.stdout, 3, 46)
      let seconds = parseInt(String(((endTime - startTime) / 1000) % 60), 10 )

      seconds = seconds < 10 ? parseInt(`0${seconds}`) : seconds

      process.stdout.write(`Time Elapsed: ${(Math.floor(((endTime - startTime) / 1000) / 60))}:${seconds}`)
      readline.cursorTo(process.stdout, 3, 47)
      process.stdout.write(`Rate: ${parseInt( String(count / ((endTime - startTime) / 1000)), 10)}x`)
    }

    let xPosition = 7 + Math.floor(tickers.indexOf(ticker) / SCREEN_ROWS) * COLUMN_WIDTH
    readline.cursorTo(process.stdout, xPosition, tickers.indexOf(ticker) % SCREEN_ROWS)
    process.stdout.write(`\x1b[37m${quote.price.toFixed(2)}${randChars[Math.floor(Math.random() * 10)]}`)
    count++
  }
}

console.clear()
drawScreen(tickers)

readline.cursorTo(process.stdout, 0, 40)
console.log(" ")

const interval = setInterval(() => { grab(tickers)}, config.REFRESH_RATE_MILLISECONDS)
