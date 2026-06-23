const tokens = [];

module.exports = {
  tokens,

  create(token) {
    tokens.push(token);
    return token;
  },

  findByUser(userId) {
    return tokens.find((token) => token.user === userId) || null;
  },

  findOne(query) {
    return (
      tokens.find(
        (token) =>
          (query.refreshToken && token.refreshToken === query.refreshToken) ||
          (query.user && token.user === query.user)
      ) || null
    );
  },

  remove(query) {
    const index = tokens.findIndex(
      (token) =>
        (query.refreshToken && token.refreshToken === query.refreshToken) ||
        (query.user && token.user === query.user)
    );

    if (index === -1) {
      return null;
    }

    return tokens.splice(index, 1)[0];
  },
};