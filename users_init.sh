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
EOF