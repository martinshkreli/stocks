import config from "@config"
import { Ticker } from '@aliases'
import tickers from "@tickers"
import { 
  fetchTicker, 
  drawScreen, 
  getRandomChar, 
  cursors
} from '@utils'

const startTime = Date.now()

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

    if (!quote) return

    if (count % 250 == 0 && count > 1) {      
      const endTime = Date.now()
      let seconds = parseInt(String(((endTime - startTime) / 1000) % 60), 10 )
      seconds = seconds < 10 ? parseInt(`0${seconds}`) : seconds

      cursors.dataReceived.write(`Data Received: ${count}`)
      cursors.timeElapsed.write(`Time Elapsed: ${(Math.floor(((endTime - startTime) / 1000) / 60))}:${seconds}`)
      cursors.rate.write(`Rate: ${parseInt( String(count / ((endTime - startTime) / 1000)), 10)}x`)
    }

    const xPosition = 7 + Math.floor(tickers.indexOf(ticker) / config.SCREEN_ROWS) * config.COLUMN_WIDTH
    const yPosition = tickers.indexOf(ticker) % config.SCREEN_ROWS
    cursors.quotePrice
      .setXPosition(xPosition)
      .setYPosition(yPosition)
      .write(`\x1b[37m${quote.price.toFixed(2)}${getRandomChar()}`)

    count++
  }
}

console.clear()
drawScreen(tickers)
cursors.generic.write("")

setInterval(() => { 
  grab(tickers)
}, config.REFRESH_RATE_MILLISECONDS)
