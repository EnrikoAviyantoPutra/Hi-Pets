const { checkToken } = require('../helpers/jwt');

const authenticationUser = (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const decoded = checkToken(access_token, process.env.SECRET_KEY);

    req.decoded = decoded;

    next();
  } catch (err) {
    next({ name: 'Unauthorized', status: 401, msg: 'You must login first' });
  }
}

module.exports = authenticationUser;