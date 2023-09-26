const jwt = require('jsonwebtoken');

const { jwt: jwtConfigs } = require('../configs/config');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfigs.secret, {
    expiresIn: jwtConfigs.expiration,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfigs.secret);
}

module.exports = { generateToken, verifyToken };
