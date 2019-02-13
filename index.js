'use strict';


/**
 * @module Plan
 * @name Plan
 * @description A representation of written set of activities and procedures
 * that outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.2.0
 * @example
 *
 * const { app } = require('@lykmapipo/plan');
 * app.start();
 *
 */


/* dependencies */
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const app = require('@lykmapipo/express-common');
const pkg = include(__dirname, 'package.json');
const Plan = include(__dirname, 'lib', 'plan.model');
const Activity = include(__dirname, 'lib', 'activity.model');
const Procedure = include(__dirname, 'lib', 'procedure.model');
const planRouter = include(__dirname, 'lib', 'plan.http.router');
const activityRouter = include(__dirname, 'lib', 'activity.http.router');
const procedureRouter = include(__dirname, 'lib', 'procedure.http.router');


/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.info = _.merge({}, _.pick(pkg, [
  'name', 'description', 'version', 'license',
  'homepage', 'repository', 'bugs', 'sandbox', 'contributors'
]));


/**
 * @name Plan
 * @description Plan model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Plan = Plan;


/**
 * @name Activity
 * @description Activity model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Activity = Activity;


/**
 * @name Procedure
 * @description Procedure model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Procedure = Procedure;


/**
 * @name planRouter
 * @description plan http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.planRouter = planRouter;


/**
 * @name activityRouter
 * @description activity http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.activityRouter = activityRouter;


/**
 * @name procedureRouter
 * @description procedure http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.procedureRouter = procedureRouter;


/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.apiVersion = planRouter.version;

/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(planRouter);
    app.mount(activityRouter);
    app.mount(procedureRouter);
    return app;
  }
});
