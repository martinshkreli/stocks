import { Cursor } from "@utils"

const dataReceived = new Cursor(3, 45)
const timeElapsed = new Cursor(3, 46)
const rate = new Cursor(3, 47)
const quotePrice = new Cursor()
const generic = new Cursor(0, 40)

export const cursors = {
    dataReceived,
    timeElapsed,
    rate,
    quotePrice,
    generic
}
