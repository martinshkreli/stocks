import config from '@config'
import { Ticker } from '@aliases'

function createFetchTickerFn(url: URL) {
    return async function fetchTicker(ticker: Ticker) {
        const response = await fetch(`${url}/${ticker}`)
        const quote = await response.json()
        return quote
    }
}

export const fetchTicker = createFetchTickerFn(config.SERVER_URL)
