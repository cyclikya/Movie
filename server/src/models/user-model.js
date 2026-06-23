const users = [];

function createUser({ email, password }) {
  const user = {
    id: users.length + 1,
    email,
    password,
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

module.exports = {
  users,
  createUser,
  findUserByEmail,
};