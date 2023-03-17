import readline from 'readline'

export class Cursor {
    private stream = process.stdout
    private cursorTo = readline.cursorTo

    public constructor(private xPosition?: number, private yPosition?: number) {}

    setXPosition(newValue: number) {
        this.xPosition = newValue
        return this
    }

    setYPosition(newValue: number) {
        this.yPosition = newValue
        return this
    }

    write(text: string) {
        this.cursorTo(this.stream, this.xPosition ?? 0, this.yPosition)
        this.stream.write(text)
    }
}
