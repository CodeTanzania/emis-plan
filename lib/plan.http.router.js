'use strict';

/**
 * @apiDefine Plan Plan
 *
 * @apiDescription A representation of written set of activities and procedures
 * that outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */

/**
 * @apiDefine Plan
 * @apiSuccess {String} _id Unique plan identifier
 * @apiSuccess {IncidentType} [incidentType = undefined] An incident type under which
 * a plan is applicable. If not available a plan is applicable to all
 * incident type.
 * @apiSuccess {String} [description] A brief summary about a plan if available i.e
 * additional details that clarify what a plan is for.
 * @apiSuccess {Date} [publishedAt] Date when plan was made effective for use.
 * @apiSuccess {Date} createdAt Date when plan was created
 * @apiSuccess {Date} updatedAt Date when plan was last updated
 *
 */

/**
 * @apiDefine Plans
 * @apiSuccess {Plan[]} data List of plans
 * @apiSuccess {String} data._id Unique plan identifier
 * @apiSuccess {IncidentType} [data.incidentType = undefined] An incident type under
 * which a plan is applicable. If not available a plan is applicable to all
 * incident type.
 * @apiSuccess {String} [data.description] A brief summary about a plan if
 * available i.e additional details that clarify what a plan is for.
 * @apiSuccess {Date} [data.publishedAt] Date when plan was made effective for use.
 * @apiSuccess {Date} data.createdAt Date when plan was created
 * @apiSuccess {Date} data.updatedAt Date when plan was last updated
 * @apiSuccess {Number} total Total number of plan
 * @apiSuccess {Number} size Number of plan returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest plan
 * was last modified
 *
 */

/**
 * @apiDefine PlanSuccessResponse
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
 * @apiDefine PlansSuccessResponse
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
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const { getString } = require('@lykmapipo/env');
const Router = require('@lykmapipo/express-common').Router;

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/plans';
const PATH_SINGLE = '/plans/:id';
const PATH_SCHEMA = '/plans/schema/';

/* declarations */
const Plan = include(__dirname, 'plan.model');
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /plans List Plans
 * @apiVersion 1.0.0
 * @apiName GetPlans
 * @apiGroup Plan
 * @apiDescription Returns a list of plans
 * @apiUse RequestHeaders
 * @apiUse Plans
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlansSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getPlans(request, response, next) {
  //obtain request options
  const options = _.merge({}, request.mquery);

  Plan.get(options, function onGetPlans(error, results) {
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
 * @api {get} /plans/schema Get Plan Schema
 * @apiVersion 1.0.0
 * @apiName GetPlanSchema
 * @apiGroup Plan
 * @apiDescription Returns plan json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Plan.jsonSchema();
  response.status(200);
  response.json(schema);
});

/**
 * @api {post} /plans Create New Plan
 * @apiVersion 1.0.0
 * @apiName PostPlan
 * @apiGroup Plan
 * @apiDescription Create new plan
 * @apiUse RequestHeaders
 * @apiUse Plan
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlanSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postPlan(request, response, next) {
  //obtain request body
  const body = _.merge({}, request.body);

  Plan.post(body, function onPostPlan(error, created) {
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
 * @api {get} /plans/:id Get Existing Plan
 * @apiVersion 1.0.0
 * @apiName GetPlan
 * @apiGroup Plan
 * @apiDescription Get existing plan
 * @apiUse RequestHeaders
 * @apiUse Plan
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlanSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getPlan(request, response, next) {
  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain plan id
  options._id = request.params.id;

  Plan.getById(options, function onGetPlan(error, found) {
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
 * @api {patch} /plans/:id Patch Existing Plan
 * @apiVersion 1.0.0
 * @apiName PatchPlan
 * @apiGroup Plan
 * @apiDescription Patch existing plan
 * @apiUse RequestHeaders
 * @apiUse Plan
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlanSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchPlan(request, response, next) {
  //obtain plan id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  Plan.patch(id, patches, function onPatchPlan(error, patched) {
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
 * @api {put} /plans/:id Put Existing Plan
 * @apiVersion 1.0.0
 * @apiName PutPlan
 * @apiGroup Plan
 * @apiDescription Put existing plan
 * @apiUse RequestHeaders
 * @apiUse Plan
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlanSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putPlan(request, response, next) {
  //obtain plan id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  Plan.put(id, updates, function onPutPlan(error, updated) {
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
 * @api {delete} /plans/:id Delete Existing Plan
 * @apiVersion 1.0.0
 * @apiName DeletePlan
 * @apiGroup Plan
 * @apiDescription Delete existing plan
 * @apiUse RequestHeaders
 * @apiUse Plan
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse PlanSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deletePlan(request, response, next) {
  //obtain plan id
  const { id } = request.params;

  Plan.del(id, function onDeletePlan(error, deleted) {
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
