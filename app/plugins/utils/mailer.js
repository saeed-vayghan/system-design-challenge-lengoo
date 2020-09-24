'use strict';

const nodemailer = require('nodemailer');

const smtpOptions = {
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-gmail-password'
  }
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(smtpOptions);

  await transporter.sendMail(options);
};


module.exports = sendEmail;