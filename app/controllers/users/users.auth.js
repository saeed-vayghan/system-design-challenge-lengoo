'use strict';

const md5 = require('md5');

const { APIError } = require('../../plugins/middlewares/error');
const UserPlugin   = require('../../plugins/models/users');
const ClientPlugin = require('../../plugins/models/oauth/client');
const AccessTokenPlugin  = require('../../plugins/models/oauth/accessTokens');
const RefreshTokenPlugin = require('../../plugins/models/oauth/refreshTokens');


/**
 * @api {post} /users/login User Login
 * @apiVersion 1.0.0
 * @apiName userLogIn
 * @apiGroup User-Auth
 * @apiPermission User
 *
 * @apiUse BaseHeader
 *
 * @apiParam {String} email
 * @apiParam {String} password - one time md5 user enetered password
 *
 * @apiParamExample {json} Request:
 *    /users/login
      {
        "email": "",
        "password": ""
      }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccess {String} accessToken user access token
 * @apiSuccess {String} accessToken user refresh token
 * @apiSuccess {String} expireIn accessToken expire time in secomds 
 *
 * @apiSuccessExample {json} Response-Structure:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "accessToken": "",
 *      "refreshToken": "",
 *      "expireIn": 18000
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
const userLogIn = async function (req, res, next) {
  const email    = req.body.email.toLowerCase();
  const password = req.body.password.toLowerCase();
  const client   = req.headers['client'];

  if (!client) {
    return next(new APIError(403, 'Missed Client!'));
  }

  if (!req.body.email) {
    return next(new APIError(403, 'Missed Email!'));
  }

  if (!req.body.password) {
    return next(new APIError(403, 'Missed Password!'));
  }

  const clientObj = await ClientPlugin.findOneByQuery({ client })

  if (!clientObj) {
    return next(new APIError(404, 'Bad Client!'));
  }

  const user = await UserPlugin.findOneByQuery({ email })

  if (!user) {
    return next(new APIError(404, 'Credential Not Found!'));
  }

  if ( user.hashedPassword !== md5(user.salt+password) ) {
    return next(new APIError(404, 'Credential Is Not Valid!'));
  }

  const oldAccessToken  = await AccessTokenPlugin.findOneByQuery({ _user: user._id, client })
  const oldRefreshToken = await RefreshTokenPlugin.findOneByQuery({ _user: user._id, client })

  if (oldAccessToken) {
    await AccessTokenPlugin.deleteOneById(oldAccessToken._id)
  }

  if (oldRefreshToken) {
    await RefreshTokenPlugin.deleteOneById(oldRefreshToken._id)
  }

  const aToken = await AccessTokenPlugin.createToken(user, client)
  const rToken = await RefreshTokenPlugin.createToken(user, client)

  return res.json({
    status: 'success',
    accessToken: aToken.token,
    refreshToken: rToken.token
  });
};


module.exports = {
  userLogIn
}