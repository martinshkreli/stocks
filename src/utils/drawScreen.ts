import config from "@config"
import { Ticker } from "@aliases"
import { ScreenConfigModel } from "@models"
import { Cursor } from "@utils"

const createDrawScreenFn = ({
    SCREEN_ROWS,
    COLUMN_WIDTH 
}: ScreenConfigModel) => {
  return function drawScreen(tickers: Ticker[]) {
    for (let i = 0; i < tickers.length; i++) {
      let k = Math.floor(i / SCREEN_ROWS)
      let dashes = "-".repeat(COLUMN_WIDTH - tickers[i].length)
      const cursor = new Cursor(k * COLUMN_WIDTH, i - SCREEN_ROWS * k)
      cursor.write(`\x1b[33m${tickers[i]}${dashes}`)
    }
  }
}

export const drawScreen = createDrawScreenFn({
  SCREEN_ROWS: config.SCREEN_ROWS,
  COLUMN_WIDTH: config.COLUMN_WIDTH,
})
