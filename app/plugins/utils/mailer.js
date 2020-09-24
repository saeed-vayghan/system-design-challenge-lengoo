'use strict';

const config = require('../../../config');

const nodemailer = require('nodemailer');

const smtpOptions = {
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: config.gmail.user,
    pass: config.gmail.pass
  },
  tls: {
    rejectUnauthorized: false
  }
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(smtpOptions);

  return await transporter.sendMail(options);
};


module.exports = sendEmail;