const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = (email, subject, content) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail_username,
      pass: config.gmail_password
    }
  });

  var mailOptions = {
    from: config.gmail_username,
    to: email,
    subject: subject,
    text: content
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;
