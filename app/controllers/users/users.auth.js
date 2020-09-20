'use strict';

const mongoose     = require('mongoose');
const User         = mongoose.model('User');
const Client       = mongoose.model('Client');
const AccessToken  = mongoose.model('AccessToken');
const RefreshToken = mongoose.model('RefreshToken');

const md5 = require('md5');
const { tokenGen } = require('../../plugins/utils/randomString')



const createTokens = async (user, client) => {
  const currentUnixTS = new Date().getTime();

  /** @type {IAccessToken>} */
  const aToken = new AccessToken();

  /** @type {IRefreshToken>} */
  const rToken = new RefreshToken();

  aToken._user   = user._id; 
  aToken.client  = client;
  aToken.token   = tokenGen.generate(24);
  aToken.created = currentUnixTS;

  rToken._user   = user._id; 
  rToken.client  = client;
  rToken.token   = tokenGen.generate(24);
  rToken.created = currentUnixTS;

  await rToken.save();
  await aToken.save();
      
  return {
    aToken,
    rToken
  };
};


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
exports.userLogIn = async function (req, res, next) {
  const email    = req.body.email.toLowerCase();
  const password = req.body.password.toLowerCase();
  const client   = req.headers['client'];

  if (!client) {
    return res.status(403).json({ status: 'failed', message: 'miss-client' });
  }

  if (!req.body.email) {
    return res.status(403).jsonp({ status: 'failed', message: 'bad-input' });
  }

  if (!req.body.password) {
    return res.status(403).jsonp({ status: 'failed', message: 'bad-input' });
  }

  const clientObj = await Client.findOne({ client: client })

  if (!clientObj) {
    return res.status(404).json({ status: 'failed', message: 'bad-client' });
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ status: 'failed', message: 'bad-credential' });
  }

  if ( user.hashedPassword !== md5(user.salt+password) ) {
    return res.status(403).json({ status: 'failed', message: 'bad-credential' });
  }

  const oldRefreshToken = await RefreshToken.findOne({ _user: user._id, client: client })
  const oldAccessToken  = await AccessToken.findOne({ _user: user._id, client: client })
  
  if (oldAccessToken) {
    await oldAccessToken.remove();
  }

  if (oldRefreshToken) {
    await oldRefreshToken.remove();
  }

  const { aToken, rToken } = await createTokens(user, client)

  return res.json({
    status: 'success',
    accessToken: aToken.token,
    refreshToken: rToken.token
  });
};