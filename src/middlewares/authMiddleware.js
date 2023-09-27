const { verifyToken } = require('../utils/jwtHelper');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  try {
    const decodedToken = verifyToken(token);
    // Attach the user data to the req object
    req.userData = {
      userId: decodedToken.userId,
      username: decodedToken.username,
      email: decodedToken.email,
      first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
    };
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;