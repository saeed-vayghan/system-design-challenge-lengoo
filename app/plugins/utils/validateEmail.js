'use strict';

const validateEmail = (mail) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (mail.match(mailformat)) {
    return true;
  }

  return false;
};


module.exports = validateEmail;