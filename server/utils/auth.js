const jwt = require('jsonwebtoken');

const secret = process.env.SECRET

// How long token will persist for before it expires
const expiration = '4h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id, admin }) {
    const payload = { email, username, _id, admin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
