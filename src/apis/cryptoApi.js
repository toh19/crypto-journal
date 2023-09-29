const axios = require('axios');

const { crypto } = require('../configs/config');
const logger = require('../utils/logger');

const options = {
  headers: {
    'x-access-token': crypto.apiKey,
  },
};

const makeApiCall = async (endpoint) => {
  try {
    const response = await axios.get(`${endpoint}`, options);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside of the 2xx range
      logger.error(`API Error: ${error.response.data}`);
      throw new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // The request was made, but no response was received
      logger.error(`No response from API: ${error.request}`);
      throw new Error('No response from API');
    } else {
      // Something else happened while setting up the requst
      logger.error(`Request setup error: ${error.message}`);
      throw new Error('Request setup error');
    }
  }
};

// https://developers.coinranking.com/api/documentation/coins#get-list-of-coins
const getCoinsList = async () => {
  const data = await makeApiCall(`${crypto.apiURL}/coins`);
  return data.coins;
};

// https://developers.coinranking.com/api/documentation/coins#get-coin-details
const getCoinDetails = async (uuid) => {
  const data = await makeApiCall(`${crypto.apiURL}/coin/${uuid}`);
  return data.coin
};

module.exports = { getCoinsList, getCoinDetails };
