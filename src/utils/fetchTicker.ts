import axios from 'axios'
import config from "@config"
import { Ticker } from "@aliases"
import { ServerResponseModel } from "@models"

function createFetchTickerFn(url: URL) {
  return async function fetchTicker(ticker: Ticker) {
    const response = await axios.get<ServerResponseModel>(`${url}/${ticker}`)
    return response.data
  }
}

export const fetchTicker = createFetchTickerFn(config.SERVER_URL)
