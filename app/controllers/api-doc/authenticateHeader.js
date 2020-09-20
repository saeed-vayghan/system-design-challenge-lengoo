/**
 * @apiDefine authenticateHeader
 *
 * @apiHeader {String} Accept-Encoding data encoding.
 * @apiHeader {String} Accept body data type.
 * @apiHeader {String} Content-Type body content-type.
 * @apiHeader {String} Authorization Users unique access-key.
 * @apiHeader {String} App-Version Application Version
 * @apiHeader {String="webApp","androidMobileApp","iosMobileApp"} Client
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Encoding": "gzip, deflate",
 *       "Accept": "application/json",
 *       "Authorization": "Server-generated-token",
 *       "App-Version": "1.0.0",
 *       "Client": "androidMobileApp"
 *     }
 */


/**
 * @apiDefine BaseHeader
 *
 * @apiHeader {String} Accept-Encoding data encoding.
 * @apiHeader {String} Accept body data type.
 * @apiHeader {String} Content-Type body content-type.
 * @apiHeader {String} App-Version Application Version
 * @apiHeader {String="webApp","androidMobileApp","iosMobileApp"} Client
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Encoding": "gzip, deflate",
 *       "Accept": "application/json",
 *       "Content-type": "application/json",
 *       "App-Version": "1.0.0",
 *       "Client": "androidMobileApp"
 *     }
 */