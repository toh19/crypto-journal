const express = require('express');
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');
const logger = require('../utils/logger');
const { signToken } = require('../utils/jwtHelper');
const validateRegistration = require('../middlewares/validateRegistrationMiddleware');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();



router.post('/register', validateRegistration, async (req, res) => {
  logger.info('Registration request received.');
  try {
    const { username, email, password, first_name, last_name } = req.body;

    // Check if username already exists
    const existingUsername = await userModel.getUserByUsername(username);
    if (existingUsername) {
      logger.warn(`Attempt to register with existing username: ${username}`);
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await userModel.getUserByEmail(email);
    if (existingEmail) {
      logger.warn(`Attempt to register with existing email: ${email}`);
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register the user
    const user = {
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
    };
    const registeredUser = await userModel.registerUser(user);
    logger.info(
      `User registered successfully. UserID: ${registeredUser.user_id}`
    );

    // Prepare the token payload
    const tokenPayload = {
      userId: registeredUser.user_id,
      username: registeredUser.username,
      email: registeredUser.email,
      first_name: registeredUser.first_name,
      last_name: registeredUser.last_name,
    };
    // Generate a token
    const token = signToken(tokenPayload);

    // ...registeredUser to be able to use user details right away in the client without having to decode the token
    res.status(201).json({ ...tokenPayload, token });
  } catch (err) {
    logger.error(`Error registering the user: ${err.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/login', async (req, res) => {
  logger.info('Login request received.');
  // Handle login
  const { username, password } = req.body;

  // Validate mandatory fields
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter mandatory fields' });
  }

  try {
    // Retrieve user from the database
    const user = await userModel.getUserByUsername(username);

    // Check if user exists and password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Prepare the token payload
      const tokenPayload = {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      // Generate a token
      const token = signToken(tokenPayload);

      res.json({ ...tokenPayload, token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Error during login: ${err.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/protected', authenticate, (req, res) => {
  console.log(req.userData);
  res.json({ message: 'Hello Protected World!' });
});

router.post('/logout', (req, res) => {
  logger.info('Logout request received.');
  // Handle logout

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
