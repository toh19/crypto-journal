const { db } = require('../database');

const getUserByUsername = async (username) => {
  const query =
    'SELECT user_id, username, email, password, first_name, last_name FROM users WHERE username = $1';
  const result = await db.query(query, [username]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query =
    'SELECT user_id, username, email, first_name, last_name FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
};

const registerUser = async (user) => {
  const baseQuery = `INSERT INTO users (username, email, password`;
  let valuePlaceholders = `VALUES ($1, $2, $3`;

  let dynamicFields = '';
  let dynamicValues = [user.username, user.email, user.password];
  let index = 4; // 4 because we already have 3 values in the array

  if (user.first_name) {
    dynamicFields += ', first_name';
    valuePlaceholders += `, $${index++}`;
    dynamicValues.push(user.first_name);
  }

  if (user.last_name) {
    dynamicFields += ', last_name';
    valuePlaceholders += `, $${index++}`;
    dynamicValues.push(user.last_name);
  }

  const returning = 'user_id, username, email, first_name, last_name;';

  const query =
    baseQuery +
    dynamicFields +
    ') ' +
    valuePlaceholders +
    ') RETURNING ' +
    returning;
  const result = await db.query(query, dynamicValues);
  return result.rows[0];
};

module.exports = { getUserByUsername, getUserByEmail, registerUser };
