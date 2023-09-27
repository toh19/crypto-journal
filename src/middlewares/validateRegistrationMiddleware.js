const {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} = require('../utils/validation');
const logger = require('../utils/logger');

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

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

  next();
};

module.exports = validateRegistration;
