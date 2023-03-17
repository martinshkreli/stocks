import * as dotenv from "dotenv"
import { ConfigModel } from "~/models"

dotenv.config()

const config: ConfigModel = {
  SERVER_URL: new URL(process.env.SERVER_URL as string),
  REFRESH_RATE_IN_MILLISECONDS: Number(process.env.REFRESH_RATE_IN_MILLISECONDS as string),
  SCREEN_ROWS: 30,
  COLUMN_WIDTH: 20,
}

export default config
