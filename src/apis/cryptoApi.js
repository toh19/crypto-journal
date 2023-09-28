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
    logger.error(`Error in getList: ${error}`);
    throw error;
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
