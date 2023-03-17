import { ServerResponseModel } from '~/models'

export interface QuoteModel extends ServerResponseModel {
  ticker: string
}
