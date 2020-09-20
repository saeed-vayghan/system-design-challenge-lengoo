#!/bin/bash

mongo -u 'admin' -p 'admin' <<EOF
db=db.getSiblingDB('lengoo');
use lengoo;
db.createUser({
  user:  'lengoo_team_a_user_x',
  pwd: 'password',
  roles: [{
    role: 'dbOwner',
    db: 'lengoo'
  }]
});

db.auth({'lengoo_team_a_user_x', 'password');

db.clients.insert({ name: 'Web App', client: 'webApp' })
db.clients.insert({ name: 'Android Mobile App', client: 'androidMobileApp' })
db.clients.insert({ name: 'IOS Mobile App', client: 'iosMobileApp' })

EOF