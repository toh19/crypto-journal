const { verifyToken } = require('../utils/jwtHelper');

const authenticate = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const payload = verifyToken(token);
  //   req.user = payload;
  //   next();
  // } catch (err) {
  //   res.status(401).json({ message: 'Invalid token' });
  // }

  const token = req.headers['authorization'];
  if(!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;