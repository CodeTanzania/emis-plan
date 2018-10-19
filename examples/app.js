'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/plan');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { env } = require('@codetanzania/majifix-common');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { getStrings } = env;
const {
  Plan,
  planRouter,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


function boot() {

  async.waterfall([

    function clearPlans(next) {
      Plan.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearIncidentTypes(next) {
      IncidentType.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedIncidentTypes(next) {
      const incidentTypes = IncidentType.fake(20);
      IncidentType.insertMany(incidentTypes, next);
    },

    function seedPlans(incidentTypes, next) {
      const plans = Plan.fake(20);
      _.forEach(incidentTypes, function (incidentType, index) {
        plans[index].incidentType = incidentType;
      });
      Plan.insertMany(plans, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
