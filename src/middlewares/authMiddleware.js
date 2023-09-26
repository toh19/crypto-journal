const { verifyToken } = require('../utils/jwtHelper');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  // const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;