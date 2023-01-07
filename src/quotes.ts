import got from 'got';

const GENERIC709_API_URL = 'https://generic709.herokuapp.com';

const USE_MOCK_API = true;

export interface TickerData {
  price: number;
  change: string;
  time: string;
  volume: number;
}

const mockResponse = (): TickerData => ({
  price: 420.69,
  change: (Math.random() > 0.5 ? '+' : '-') + '4.20',
  time: '4:20PM -8:00',
  volume: 4206942069,
});

export async function getTickerData(tickerSymbols: string[]): Promise<Record<string, TickerData>> {
  const result: Record<string, TickerData> = {};
  let promises: Promise<void>[];
  if (USE_MOCK_API) {
    promises = tickerSymbols.map(async (ticker) => {
      const resp = mockResponse();
      result[ticker] = resp;
    });
  } else {
    promises = tickerSymbols.map(async (ticker) =>
      got.get<TickerData>(`${GENERIC709_API_URL}/stockc/${ticker}`, { responseType: 'json' }).then((response) => {
        result[ticker] = response.body;
      }),
    );
  }
  await Promise.all(promises);
  return result;
}
