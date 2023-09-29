const serverError = (
  res,
  message = 'Server error. Please try again later.'
) => {
  return res.status(500).json({ message });
};

const badRequest = (res, message) => {
  return res.status(400).json({ message });
};

module.exports = { serverError, badRequest };
