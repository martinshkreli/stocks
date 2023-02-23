const https = require('https');
const axios = require('axios');

const API_URL = 'https://generic709.herokuapp.com/stockc';

axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

async function getTicker(tickerCode) {
  try {
    const { data } = await axios.request({
      method: 'GET',
      url: `${API_URL}/${tickerCode}`,
      timeout: 0, // No timeout
    });
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

exports.getTicker = getTicker;
