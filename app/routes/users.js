'use strict';


module.exports = function(app) {

  const users = require('../controllers/users');


  app.post('/users/register', users.registerUser);
  app.post('/users/login', users.userLogIn);


  // To-DO
  // app.put('/users/verify', users.verifyUserEmail);
  // app.post('/api/users/verify', users.userLogOut);
};