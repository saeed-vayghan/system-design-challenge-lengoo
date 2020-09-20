'use strict';

const mongoose = require('mongoose');
const User     = mongoose.model('User');

const md5 = require('md5');
const { alphaGen }  = require('../../plugins/utils/randomString')
const validateEmail = require('../../plugins/utils/validateEmail')


/**
 * @api {post} /users/register Register User
 * @apiVersion 1.0.0
 * @apiName registerUser
 * @apiGroup User-Auth
 * @apiPermission User
 *
 * @apiUse BaseHeader
 *
 * @apiParam {String} displayName user displayName
 * @apiParam {String} email user email
 * @apiParam {String} password md5-password
 *
 * @apiParamExample {json} Request:
 *    /users/register
      {
        "displayName": "",
        "email": "",
        "password": ""
      }
 *
 * @apiSuccess {String} status Response status
 *
 * @apiSuccessExample {json} Response-Structure:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success"
 *    }
 *
 * @apiError {String} status Error status
 * @apiError {String} message Error message
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 db related error
 *     {
 *       "status": "failed",
 *       "message": "error-message"
 *     }
 */
const registerUser = async (req, res, next) => {
  const body = req.body;

  if (!body.email) {
    return res.status(403).jsonp({ status: 'failed', message: 'bad-input' });
  }

  if (!body.password) {
    return res.status(403).jsonp({ status: 'failed', message: 'bad-input' });
  }

  if (!body.displayName) {
    return res.status(403).jsonp({ status: 'failed', message: 'bad-input' });
  }

  if (body.email) {
    if (!validateEmail(body.email)) {
      return res.status(403).jsonp({ status: 'failed', message: 'email-is-not-valid' });
    }

    body.email = body.email.toLowerCase();
  }

  const user = new User();

  user.salt = alphaGen.generate(8);
  user.hashedPassword = md5(user.salt + body.password);
  user.displayName = body.displayName;
  user.email       = body.email;

  const duplicateEmail = await User.findOne({ email: user.email });

  if (duplicateEmail) {
    return res.status(400).json({ status: 'failed', message: 'duplicate-email' });
  }

  await user.save()
  
  return res.json({ status: 'success' });
};


module.exports = {
  registerUser
}