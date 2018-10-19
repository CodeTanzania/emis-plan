'use strict';


/**
 * @apiDefine Procedure Procedure
 *
 * @apiDescription Describe a specific task or step. It specified way to carry
 * out an activity.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Procedure
 * @apiSuccess {String} _id Unique procedure identifier.
 * @apiSuccess {Oject} plan A plan under which a activity is applicable.
 * @apiSuccess {Object} incidentType An incident type under which a activity
 * is applicable.
 * @apiSuccess {Object} activity Activity under which a procedure is applicable.
 * @apiSuccess {String} phase Disaster management phase under which activity
 * applicable.
 * @apiSuccess {String} name Human readable name of procedure.
 * @apiSuccess {String} [description] A brief summary about a procedure if
 * available i.e additional details that clarify what a procedure is for.
 * @apiSuccess {number} number Procedure number(or sequence) for ordering in
 * relation to other activity procedures.
 * @apiSuccess {Date} createdAt Date when procedure was created.
 * @apiSuccess {Date} updatedAt Date when procedure was last updated.
 *
 */


/**
 * @apiDefine Procedures
 * @apiSuccess {Object[]} data List of procedures
 * @apiSuccess {String} data._id Unique procdeure identifier.
 * @apiSuccess {Oject} data.plan A plan under which a activity is applicable.
 * @apiSuccess {Object} data.incidentType An incident type under which a activity
 * is applicable.
 * @apiSuccess {Object} data.activity Activity under which a procedure is applicable.
 * @apiSuccess {String} data.phase Disaster management phase under which activity
 * applicable.
 * @apiSuccess {String} data.name Human readable name of procedure.
 * @apiSuccess {String} [data.description] A brief summary about a procedure if
 * available i.e additional details that clarify what a procedure is for.
 * @apiSuccess {number} data.number Procedure number(or sequence) for ordering in
 * relation to other activity procedures.
 * @apiSuccess {Date} data.createdAt Date when procedure was created.
 * @apiSuccess {Date} data.updatedAt Date when procedure was last updated.
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
 * @apiDefine ProcedureSuccessResponse
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
 * @apiDefine ProceduresSuccessResponse
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
const PATH_LIST = '/procedures';
const PATH_SINGLE = '/procedures/:id';
const PATH_SCHEMA = '/procedures/schema/';


/* declarations */
const Procedure = require(path.join(__dirname, 'procedure.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /procedures List Procedures
 * @apiVersion 1.0.0
 * @apiName GetProcedures
 * @apiGroup Procedure
 * @apiDescription Returns a list of procedures
 * @apiUse RequestHeaders
 * @apiUse Procedures
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProceduresSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getProcedures(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Procedure
    .get(options, function onGetProcedures(error, results) {

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
 * @api {get} /procedures/schema Get Procedure Schema
 * @apiVersion 1.0.0
 * @apiName GetProcedureSchema
 * @apiGroup Procedure
 * @apiDescription Returns procedure json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Procedure.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /procedures Create New Procedure
 * @apiVersion 1.0.0
 * @apiName PostProcedure
 * @apiGroup Procedure
 * @apiDescription Create new procedure
 * @apiUse RequestHeaders
 * @apiUse Procedure
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProcedureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postProcedure(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Procedure
    .post(body, function onPostProcedure(error, created) {

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
 * @api {get} /procedures/:id Get Existing Procedure
 * @apiVersion 1.0.0
 * @apiName GetProcedure
 * @apiGroup Procedure
 * @apiDescription Get existing procedure
 * @apiUse RequestHeaders
 * @apiUse Procedure
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProcedureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getProcedure(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain procedure id
  options._id = request.params.id;

  Procedure
    .getById(options, function onGetProcedure(error, found) {

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
 * @api {patch} /procedures/:id Patch Existing Procedure
 * @apiVersion 1.0.0
 * @apiName PatchProcedure
 * @apiGroup Procedure
 * @apiDescription Patch existing procedure
 * @apiUse RequestHeaders
 * @apiUse Procedure
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProcedureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchProcedure(request, response, next) {

  //obtain procedure id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  Procedure
    .patch(id, patches, function onPatchProcedure(error, patched) {

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
 * @api {put} /procedures/:id Put Existing Procedure
 * @apiVersion 1.0.0
 * @apiName PutProcedure
 * @apiGroup Procedure
 * @apiDescription Put existing procedure
 * @apiUse RequestHeaders
 * @apiUse Procedure
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProcedureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putProcedure(request, response, next) {

  //obtain procedure id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  Procedure
    .put(id, updates, function onPutProcedure(error, updated) {

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
 * @api {delete} /procedures/:id Delete Existing Procedure
 * @apiVersion 1.0.0
 * @apiName DeleteProcedure
 * @apiGroup Procedure
 * @apiDescription Delete existing procedure
 * @apiUse RequestHeaders
 * @apiUse Procedure
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ProcedureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteProcedure(request, response, next) {

  //obtain procedure id
  const { id } = request.params;

  Procedure
    .del(id, function onDeleteProcedure(error, deleted) {

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
