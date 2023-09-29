const axios = require('axios');

const { crypto } = require('../configs/config');
const logger = require('../utils/logger');

const options = {
  headers: {
    'x-access-token': crypto.apiKey,
  },
};

// https://developers.coinranking.com/api/documentation/coins#get-list-of-coins
const getList = async () => {
  try {
    const response = await axios.get(`${crypto.apiURL}/coins`, options);
    return response.data.data.coins;
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

// https://developers.coinranking.com/api/documentation/coins#get-coin-details
const getCoinDetails = async (uuid) => {
  try {
    const response = await axios.get(`${crypto.apiURL}/coin/${uuid}`, options);
    return response.data.data.coin;
  } catch (error) {
    logger.error(`Error in getCoinDetails: ${error}`);
    throw error;
  }
};

module.exports = { getList, getCoinDetails };
