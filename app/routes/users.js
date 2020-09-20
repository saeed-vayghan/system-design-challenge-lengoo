'use strict';


module.exports = function(app) {

  const users = require('../controllers/users');


  app.route('/users/register').post(users.registerUser);
  // app.route('/users/verify').put(users.verifyUserEmail); // To-DO

  app.route('/users/login').post(users.userLogIn);
  // app.route('/api/users/logout').post(users.userLogOut); // To-DO
};