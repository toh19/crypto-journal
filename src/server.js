require('dotenv').config();

const express = require('express');

const authRoutes = require('./routes/auth');
const cryptoRoutes = require('./routes/crypto');
const healtCheckRoute = require('./routes/healthCheck');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/crypto', cryptoRoutes);
app.use('/', healtCheckRoute);

app.get('/', (req, res) => {
  res.send('Hello Crypto Journal!');
});

app.listen(port, () => {
  console.log(`C-J listening at http://localhost:${port}`);
});
