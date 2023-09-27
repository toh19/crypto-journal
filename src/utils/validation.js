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

module.exports = { isValidUsername, isValidEmail, isValidPassword };