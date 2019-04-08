const Cookies = require('cookies');
const config = require('../config');

const isLoggedIn = (req, res) => {
  const cookies = new Cookies(req, res, {keys: config.cookie_keys});

  const user_cookie = cookies.get('user', {signed: true});

  if (user_cookie) {
    return user_cookie;
  } else {
    return false;
  }
}

module.exports = isLoggedIn;
