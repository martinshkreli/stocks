import * as dotenv from 'dotenv'
import { ScreenConfigModel, ServerConfigModel } from '@models'

dotenv.config()

type ConfigModel = ServerConfigModel & ScreenConfigModel

const config: ConfigModel = {
    SERVER_URL: new URL(process.env.SERVER_URL as string),
    REFRESH_RATE_MILLISECONDS: Number(process.env.REFRESH_RATE_MILLISECONDS as string),
    SCREEN_ROWS: 30,
    COLUMN_WIDTH: 20
}

export default config