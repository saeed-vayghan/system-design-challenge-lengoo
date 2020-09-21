'use strict';


class APIError extends Error {
  constructor(statusCode, message) {
    super();

    this.statusCode = statusCode;
    this.message    = message;
    this.isOperational = true;
  }
}

const errorHandler = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};


module.exports = {
  APIError,
  errorHandler
}


/*
  List of common errors:

    RESOURCE_NOT_FOUND = {
      http: 404,
      message: 'Resource Error',
      code: 'ResourceNotFound'
    }

    VALIDATION = {
      http: 400,
      message: 'Validation Error',
      code: 'Validation'
    }

    DATABASE = {
      http: 503,
      message: 'Database Error',
      code: 'Internal'
    }

    FILESYSTEM = {
      http: 500,
      message: 'Filesystem Error',
      code: 'Internal'
    }

    UNAUTHORIZED = {
      http: 401,
      message: 'Unauthorized Access Error',
      code: 'UnauthorizedAccess'
    }

    FORBIDDEN = {
      http: 403,
      message: 'Access Forbidden',
      code: 'AccessForbidden'
    }
*/