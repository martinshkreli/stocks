import config from "~/config"
import tickers from "~/tickers"
import { Ticker } from '~/aliases'
import { QuoteModel } from '~/models'
import { fetchTicker, drawScreen, getRandomChar, cursors } from '~/utils'

const startTime = Date.now()
let count = tickers.length
async function grab(tickers: Ticker[]) {
  const promises: Promise<QuoteModel>[] = tickers.map(async (ticker) => ({ ticker, ...await fetchTicker(ticker) }))
  const quotes = await Promise.all(promises)

  if (!quotes || quotes.length === 0) return

  const endTime = Date.now()
  let seconds = parseInt(String(((endTime - startTime) / 1000) % 60), 10 )
  seconds = seconds < 10 ? parseInt(`0${seconds}`) : seconds
  cursors.dataReceived.write(`Data Received: ${count}`)
  cursors.timeElapsed.write(`Time Elapsed: ${(Math.floor(((endTime - startTime) / 1000) / 60))}:${seconds}`)
  cursors.rate.write(`Rate: ${parseInt( String(count / ((endTime - startTime) / 1000)), 10)}x`)

  quotes.forEach(quote => {
    const xPosition = 7 + Math.floor(tickers.indexOf(quote.ticker) / config.SCREEN_ROWS) * config.COLUMN_WIDTH
    const yPosition = tickers.indexOf(quote.ticker) % config.SCREEN_ROWS
    cursors.quotePrice
      .setXPosition(xPosition)
      .setYPosition(yPosition)
      .write(`\x1b[37m${quote.price.toFixed(2)}${getRandomChar()}`)

    count++
  })
}

console.clear()
drawScreen(tickers)
cursors.generic.write("")

setInterval(() => { 
  grab(tickers)
}, config.REFRESH_RATE_IN_MILLISECONDS)