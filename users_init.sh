#!/bin/bash

mongo -u 'admin' -p 'admin' <<EOF
db=db.getSiblingDB('lengoo');
use lengoo;
db.createUser({
  user:  'lengoo-team-a-user-x',
  pwd: 'password',
  roles: [{
    role: 'dbOwner',
    db: 'lengoo'
  }]
});
EOF