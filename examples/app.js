'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-plan');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { env } = require('@codetanzania/majifix-common');
const { getStrings } = env;
const {
  IncidentType,
  incidentTypeRouter
} = require('@codetanzania/emis-incident-type');
const {
  Plan,
  Activity,
  Procedure,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


function boot() {

  async.waterfall([

    function clearProcedures(next) {
      Procedure.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearActivities(next) {
      Activity.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearPlans(next) {
      Plan.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedIncidentTypes(next) {
      IncidentType.seed(next);
    },

    function seedPlans(incidentTypes, next) {
      const plans = Plan.fake(incidentTypes.length);
      _.forEach(incidentTypes, function (incidentType, index) {
        plans[index].incidentType = incidentType;
      });
      Plan.insertMany(plans, next);
    },

    function seedActivities(plans, next) {
      const activities = Activity.fake(plans.length);
      _.forEach(plans, function (plan, index) {
        activities[index].plan = plan;
      });
      Activity.insertMany(activities, next);
    },

    function seedProcedures(activities, next) {
      const procedures = Procedure.fake(activities.length);
      _.forEach(activities, function (activity, index) {
        procedures[index].activity = activity;
        procedures[index].number = (index % 2) + 1;
      });
      Procedure.insertMany(procedures, next);
    }

  ], function (error, results) {

    console.log(error);

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    app.mount(incidentTypeRouter);

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
