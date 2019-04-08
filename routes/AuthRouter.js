const express = require('express');
const Router = express.Router();
const Cookies = require('cookies');
const User = require('../models/User');
const generateConfirmationCode = require('../helpers/generateConfirmationCode');
const sendEmail = require('../helpers/sendEmail');
const createHash = require('../helpers/createHash');
const config = require('../config');

// Set up cookie keys
const cookie_keys = config.cookie_keys;

Router.post('/signup', async (req, res) => {
  let {first_name, last_name, username, email, password, confirm_password} = req.body;
  const confirmation_code = generateConfirmationCode();

  let new_user = {
    first_name,
    last_name,
    email,
    username,
    valid: false,
    login_attempts: 0,
    is_locked: false,
    confirmation_code: createHash(confirmation_code),
    requested_password_change: false,
    password_change_code: ''
  };

  let errors = [];

  if (!new_user.first_name || !new_user.last_name) {
    errors.push("noname");
  } else if (!new_user.email) {
    errors.push("noemail");
  } else if (!new_user.username) {
    errors.push("nousername");
  } else if (!password) {
    errors.push("nopassword");
  } else if (password != confirm_password) {
    errors.push("passwordmismatch");
  } else if (password.length < 6) {
    errors.push("passwordtooshort");
  } else {
    // If everything is valid
    new_user.password = createHash(password);
    const found_user_with_email = await User.findOne({email: new_user.email});
    const found_user_with_username = await User.findOne({username: new_user.username});

    if (found_user_with_email) {
      errors.push("emailexists");
    } else if (found_user_with_username) {
      errors.push("usernameexists");
    } else {
      // Save the user in database
      let new_user_document = new User(new_user);
      new_user_document.save();

      sendEmail(new_user.email, "Confirm Your Twitter Clone Account!", 'Please click on the following <a href="' + config.domain + '/auth/confirm/' + new_user.username + '/' + new_user.confirmation_code + '">link</a>')
    }
  }

  res.json({errors: errors});
});

Router.get('/confirm/:username/:code', async (req, res) => {
  const found_user = await User.findOne({username: req.params.username, confirmation_code: req.params.code});

  if (found_user) {
    const updated = await found_user.update({valid: true});
    res.redirect(config.domain);
  } else {
    res.json({error: true});
  }
});

Router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  let errors = [];

  let found_user = await User.findOne({username: username});

  if (!found_user) {
    found_user = await User.findOne({email: username});
  }

  if (found_user) {
    // User exists in the database
    const hashed_password = createHash(password);

    if (found_user.valid) {
      // The user has confirmed their email
      if (found_user.login_attempts <= 10) {
        // If there has not been too many unsuccessful login attempts
        if (found_user.password == hashed_password) {
          // Login Successful! Set the cookie
          const updated_to_zero = await found_user.update({login_attempts: 0});

          const user_cookies = new Cookies(req, res, {keys: cookie_keys});

          // Cookie expires in one month
          const cookie_set = await user_cookies.set('user', found_user.username, {signed: true, maxAge: 2592000000});

          return res.json({errors: [], user: found_user.username, first_name: found_user.first_name, last_name: found_user.last_name, email: found_user.email});
        } else {
          errors.push("passwordincorrect");
          const updated_login_attempts = await found_user.update({login_attempts: found_user.login_attempts + 1});
          console.log(found_user.login_attempts + 1);
        }
      } else {
        errors.push("toomanyloginattempts");
      }
    } else {
      errors.push("accountnotconfirmed");
    }
  } else {
    errors.push("usernotfound");
  }

  return res.json({errors: errors});
});

Router.get('/logout', async (req, res) => {
  const user_cookies = new Cookies(req, res, {keys: cookie_keys});
  const current_user = user_cookies.get('user', {signed: true});

  if (current_user) {
    const cookie_set = await user_cookies.set('user', '', {signed: true});
    res.redirect('/');
  } else {
    res.json({errors: true});
  }
});

Router.post('/passwordresetrequest', async (req, res) => {
  const email = req.body.email;

  const found_user = await User.findOne({email: email});

  if (found_user) {
    // User with this email exists so set up password change
    let password_change_code = createHash(generateConfirmationCode());
    const finished_updating = await found_user.update({requested_password_change: true, password_change_code: password_change_code});
    sendEmail(email, "Reset Your Twitter Clone Password!", "Follow This Link To Reset Your Password: " + config.domain + "/resetpassword/" + found_user.username + "/" + password_change_code);
    res.json({errors: false});
  } else {
    res.json({errors: true});
  }
});

Router.post('/resetpassword', async (req, res) => {
  const {username, reset_code, new_password} = req.body;
  const errors = [];

  const found_user = await User.findOne({username: username, password_change_code: reset_code});

  if (found_user) {
    if (found_user.requested_password_change) {
      // Change the password
      if (new_password) {
        if (new_password.length > 6) {
          const updated_password = await found_user.update({password: createHash(new_password), requested_password_change: false});
        } else {
          errors.push("passwordtooshort")
        }
      } else {
        errors.push("nopassword");
      }
    } else {
      errors.push("nopasswordchangerequest");
    }
  } else {
    errors.push("passwordresetcodeincorrect");
  }

  res.json({errors: errors});
});

Router.get('/currentuser', async (req, res) => {
  let user_cookies = new Cookies(req, res, {keys: cookie_keys});
  let user = user_cookies.get('user', {signed: true});

  if (user) {
    const found_user = await User.findOne({username: user});
    res.json({error: false, username: user, first_name: found_user.first_name, last_name: found_user.last_name, email: found_user.email});
  } else {
    res.json({error: true});
  }
});

module.exports = Router;
