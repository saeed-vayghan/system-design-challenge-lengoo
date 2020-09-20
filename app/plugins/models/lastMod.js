'use strict';

module.exports = exports = function lastModifiedPlugin (schema) {
  schema.pre('save', function (next) {
    if( this.isNew )
      this.created = new Date();

    this.updated = new Date();
    next();
  });
};