const express = require('express');
const NodeCaceh = require('node-cache');

const { getList, getCoinDetails } = require('../apis/cryptoApi');
const logger = require('../utils/logger');

const router = express.Router();
const myCache = new NodeCaceh({ stdTTL: 60 * 60 * 24 });

router.get('/all', async (req, res) => {
  // Check if we have a cached list  
  const cacheKey = 'cryptoList';
  const cachedList = myCache.get(cacheKey);
  if(cachedList) {
    return res.json(cachedList);
  } 
  try {
    const list = await getList();
    myCache.set(cacheKey, list); // Store data in cache
    res.json(list);
  } catch (error) {
    logger.error('Error in /all route:', error); // Logging the actual error
    res.status(500).json({ message: error.message });
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
