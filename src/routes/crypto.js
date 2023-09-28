const express = require('express');

const { getList, getCoinDetails } = require('../apis/cryptoApi');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/all', async (req, res) => {
  // Handle getting all cryptocurrencies
  try {
    const list = await getList();
    res.json(list);
  } catch (error) {
    logger.error('Error in /all route:', error); // Logging the actual error
    res.status(500).json({ message: 'Failed to fetch cryptocurrencies' });
  }
});

router.get('/coin/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  // Handle getting a specific cryptocurrency
  try {
    const coin = await getCoinDetails(uuid);
    res.json(coin);
  } catch (error) {
    logger.error('Error in /coin route:', error); // Logging the actual error
    res.status(500).json({ message: 'Failed to fetch coin' });
  }
});

router.get('/search', async (req, res) => {
  // Handle getting a specific cryptocurrency
});

router.get('/news', async (req, res) => {
  // Handle getting a specific cryptocurrency
});

module.exports = router;
