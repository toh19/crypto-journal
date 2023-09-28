module.exports = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
  crypto: {
    apiURL: process.env.CRYPTO_API_URL,
    apiKey: process.env.CRYPTO_API_KEY,
  },
};
