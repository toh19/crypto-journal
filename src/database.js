const { Pool } = require('pg');

const { db: dbconfig } = require('./configs/config');
const logger = require('./utils/logger');

const pool = new Pool(dbconfig);

const testDbConnection = async () => {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (err) {
    logger.error(`Database connectivity error: ${err.message}`);
    return false;
  }
};

module.exports = {
  db: pool,
  testDbConnection,
};
