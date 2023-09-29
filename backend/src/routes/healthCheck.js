const express = require('express');

const { testDbConnection } = require('../database');

const router = express.Router();

router.get('/health', async (req, res) => {
  const isDbConnected = await testDbConnection();
  if (isDbConnected) {
    res.status(200).json({
      status: 'OK',
      app: 'Operational',
      database: 'Operational',
    });
  } else {
    res.status(500).json({
      status: 'NOT OK',
      app: 'Operational',
      database: 'Down',
    });
  }
});

module.exports = router;
