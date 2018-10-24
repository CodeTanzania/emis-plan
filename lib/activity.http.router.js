'use strict';


/**
 * @apiDefine Activity Activity
 *
 * @apiDescription Define a specific action or function.
 *
 * Its a major unit of work to be completed in achieving objectives of a plan.
 *
 * An activity has a set of procedures to be followed and it consumes resources.
 *
 * An activity may have a precedence relationship with other activities i.e
 * finish-to-start, start-to-start, finish-to-finish etc.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Activity
 * @apiSuccess {String} _id Unique activity identifier.
 * @apiSuccess {Oject} plan A plan under which a activity is applicable.
 * @apiSuccess {Object} incidentType An incident type under which a activity
 * is applicable.
 * @apiSuccess {String} phase Disaster management phase under which activity
 * applicable.
 * @apiSuccess {String} name Human readable name of activity.
 * @apiSuccess {String} [description] A brief summary about a activity if
 * available i.e additional details that clarify what a activity is for.
 * @apiSuccess {Date} createdAt Date when activity was created.
 * @apiSuccess {Date} updatedAt Date when activity was last updated.
 *
 */


/**
 * @apiDefine Activities
 * @apiSuccess {Object[]} data List of procedures
 * @apiSuccess {String} data._id Unique activity identifier.
 * @apiSuccess {Oject} data.plan A plan under which a activity is applicable.
 * @apiSuccess {Object} data.incidentType An incident type under which a activity
 * is applicable.
 * @apiSuccess {String} data.phase Disaster management phase under which activity
 * applicable.
 * @apiSuccess {String} data.name Human readable name of activity.
 * @apiSuccess {String} [data.description] A brief summary about a activity if
 * available i.e additional details that clarify what a activity is for.
 * @apiSuccess {Date} data.createdAt Date when activity was created.
 * @apiSuccess {Date} data.updatedAt Date when activity was last updated.
 * @apiSuccess {Number} total Total number of activity.
 * @apiSuccess {Number} size Number of activity returned.
 * @apiSuccess {Number} limit Query limit used.
 * @apiSuccess {Number} skip Query skip/offset used.
 * @apiSuccess {Number} page Page number.
 * @apiSuccess {Number} pages Total number of pages.
 * @apiSuccess {Date} lastModified Date and time at which latest activity
 * was last modified.
 *
 */


/**
 * @apiDefine ActivitySuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5aeed5f37e422f2743b97eb0",
 *   "incidentType: {
 *    "_id: "5af2fe3ea937a3238bd8e64b",
 *    "name": "Flood"
 *    "nature": "Natural",
 *    "family": "Hydrological",
 *    "color": "#F7EF18",
 *   },
 *   "description": "Nobis provident aliquam nobis.",
 *   "publishedAt": "2018-06-06T10:16:19.230Z",
 *   "createdAt": "2018-05-06T10:16:19.230Z",
 *   "updatedAt": "2018-05-06T10:16:19.230Z",
 * }
 */


/**
 * @apiDefine ActivitiesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *    {
 *     "_id": "5aeed5f37e422f2743b97eb0",
 *     "incidentType: {
 *     "_id: "5af2fe3ea937a3238bd8e64b",
 *     "name": "Flood"
 *     "nature": "Natural",
 *     "family": "Hydrological",
 *     "color": "#F7EF18",
 *    },
 *    "description": "Nobis provident aliquam nobis.",
 *    "publishedAt": "2018-06-06T10:16:19.230Z",
 *    "createdAt": "2018-05-06T10:16:19.230Z",
 *    "updatedAt": "2018-05-06T10:16:19.230Z",
 *   }
 *   ],
 *   "total": 10,
 *   "size": 2,
 *   "limit": 2,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 5,
 *   "lastModified": "2018-05-06T10:19:04.910Z"
 * }
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;
const { env } = require('@codetanzania/majifix-common');


/* local constants */
const API_VERSION = env.API_VERSION;
const PATH_LIST = '/activities';
const PATH_SINGLE = '/activities/:id';
const PATH_SCHEMA = '/activities/schema/';


/* declarations */
const Activity = require(path.join(__dirname, 'activity.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /activities List Activities
 * @apiVersion 1.0.0
 * @apiName GetActivities
 * @apiGroup Activity
 * @apiDescription Returns a list of activities
 * @apiUse RequestHeaders
 * @apiUse Activities
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitiesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getActivities(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Activity
    .get(options, function onGetActivities(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {get} /activities/schema Get Activity Schema
 * @apiVersion 1.0.0
 * @apiName GetActivitySchema
 * @apiGroup Activity
 * @apiDescription Returns activity json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Activity.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /activities Create New Activity
 * @apiVersion 1.0.0
 * @apiName PostActivity
 * @apiGroup Activity
 * @apiDescription Create new activity
 * @apiUse RequestHeaders
 * @apiUse Activity
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postActivity(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Activity
    .post(body, function onPostActivity(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});


/**
 * @api {get} /activities/:id Get Existing Activity
 * @apiVersion 1.0.0
 * @apiName GetActivity
 * @apiGroup Activity
 * @apiDescription Get existing activity
 * @apiUse RequestHeaders
 * @apiUse Activity
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getActivity(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain activity id
  options._id = request.params.id;

  Activity
    .getById(options, function onGetActivity(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /activities/:id Patch Existing Activity
 * @apiVersion 1.0.0
 * @apiName PatchActivity
 * @apiGroup Activity
 * @apiDescription Patch existing activity
 * @apiUse RequestHeaders
 * @apiUse Activity
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchActivity(request, response, next) {

  //obtain activity id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  Activity
    .patch(id, patches, function onPatchActivity(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});


/**
 * @api {put} /activities/:id Put Existing Activity
 * @apiVersion 1.0.0
 * @apiName PutActivity
 * @apiGroup Activity
 * @apiDescription Put existing activity
 * @apiUse RequestHeaders
 * @apiUse Activity
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putActivity(request, response, next) {

  //obtain activity id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  Activity
    .put(id, updates, function onPutActivity(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});


/**
 * @api {delete} /activities/:id Delete Existing Activity
 * @apiVersion 1.0.0
 * @apiName DeleteActivity
 * @apiGroup Activity
 * @apiDescription Delete existing activity
 * @apiUse RequestHeaders
 * @apiUse Activity
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ActivitySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteActivity(request, response, next) {

  //obtain activity id
  const { id } = request.params;

  Activity
    .del(id, function onDeleteActivity(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/* expose router */
module.exports = router;