import readline from 'readline'

import config from '@config'
import { Ticker } from "@aliases"
import { ScreenConfigModel } from '@models'

const { SCREEN_ROWS, COLUMN_WIDTH } = config

const createDrawScreenFn = ({
    SCREEN_ROWS,
    COLUMN_WIDTH
}: ScreenConfigModel) => {
    return function drawScreen(tickers: Ticker[]) {
        for (let i = 0; i < tickers.length; i++) {
            let k = Math.floor(i / SCREEN_ROWS)
            readline.cursorTo(process.stdout, k * COLUMN_WIDTH, i - SCREEN_ROWS * k)
            let dashes = "-".repeat(COLUMN_WIDTH - tickers[i].length)
            process.stdout.write(`\x1b[33m${tickers[i]}${dashes}`)
        }
    }
}

export const drawScreen = createDrawScreenFn({
    SCREEN_ROWS,
    COLUMN_WIDTH
})
