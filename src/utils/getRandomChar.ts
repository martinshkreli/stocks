import { getRandomElement } from "@utils"

const randChars = ['*', '%', '$', '&', '@', '!', '^', '~', '+', '?', '/', '|', '<', '>']

export function getRandomChar() {
    return getRandomElement(randChars)
}
