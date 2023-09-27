const express = require('express');
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');
const logger = require('../utils/logger');
const { signToken } = require('../utils/jwtHelper');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

const isValidUsername = (username) => {
  const usernameRegex = /^[A-Za-z0-9](?:[A-Za-z0-9-_]{3,18}[A-Za-z0-9])?$/;
  return usernameRegex.test(username);
};

const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  return passwordRegex.test(password);
};

router.post('/register', async (req, res) => {
  logger.info('Registration request received.');
  try {
    const { username, email, password, first_name, last_name, role } = req.body;

    // Validate mandatory fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Username, email and password are mandatory' });
    }

    // Validate username criteria
    if (!isValidUsername(username)) {
      logger.warn(`Invalid username format: ${username}`);
      return res.status(400).json({
        message:
          'Username must be between 5 and 20 characters long, can contain letters, numbers, hyphens, and underscores, and must not start or end with a special character.',
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      logger.warn(`Invalid email format: ${email}`);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password criteria
    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      });
    }

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
    }
    // Generate a token
    const token = signToken(tokenPayload);

    res.status(201).json({ ...registeredUser, token });
  } catch (err) {
    logger.error(`Error registering the user: ${err.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/login', (req, res) => {
  logger.info('Login request received.');
  // Handle login

  // Generate a token
  const token = signToken({ userId: registeredUser.user_id });
  res.status(200).json({ ...loggedInUser, token });
});

router.get('/protected', authenticate, (req, res) => {
  console.log(req.userData)
  res.json({message: 'Hello Protected World!'});
});

router.post('/logout', (req, res) => {
  logger.info('Logout request received.');
  // Handle logout

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
