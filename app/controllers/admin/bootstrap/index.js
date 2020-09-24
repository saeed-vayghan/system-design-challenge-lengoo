'use strict';

const ClientPlugin = require('../../../plugins/models/oauth/client')
const UserPlugin   = require('../../../plugins/models/users');


const createClients = async () => {
  return await ClientPlugin.createClients();
};

const createAdminUSer = async () => {
  try {
    const user = await UserPlugin.createUser({
      displayName: 'System Admin',
      email: 'admin@domain.com',
      password: 123456
    });
  
    delete user.salt
    delete user.hashedPassword
  
    return user

  } catch (ex) {

    return ex
  }
};

const start = async function (req, res, next) {
  const clients = await createClients();
  const admin   = await createAdminUSer();

  return res.json({
    clients,
    admin
  })
};


module.exports = {
  start
}