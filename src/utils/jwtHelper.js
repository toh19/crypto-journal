const jwt = require('jsonwebtoken');

const { jwt: jwtConfigs } = require('../configs/config');

const signToken = (payload) => {
  return jwt.sign(payload, jwtConfigs.secret, {
    expiresIn: jwtConfigs.expiration,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfigs.secret);
}

module.exports = { signToken, verifyToken };
