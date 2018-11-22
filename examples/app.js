'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-plan');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const app = require('@lykmapipo/express-common');
const { Permission, permissionRouter } = require('@lykmapipo/permission');
const { Role, roleRouter } = require('@codetanzania/emis-role');
const { Party, partyRouter } = require('@codetanzania/emis-stakeholder');
const { Alert, alertRouter } = require('@codetanzania/emis-alert');
const {
  Item,
  Stock,
  Adjustment,
  itemRouter,
  stockRouter,
  adjustmentRouter
} = require('@codetanzania/emis-resource');
const {
  IncidentType,
  incidentTypeRouter
} = require('@codetanzania/emis-incident-type');
const {
  Plan,
  planRouter,
  Activity,
  activityRouter,
  Procedure,
  procedureRouter,
  info
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


/* refs */
let parties;
let roles;
let items;


/* mount routers */
app.mount(permissionRouter);
app.mount(roleRouter);
app.mount(partyRouter);
app.mount(alertRouter);
app.mount(itemRouter);
app.mount(stockRouter);
app.mount(adjustmentRouter);
app.mount(planRouter);
app.mount(activityRouter);
app.mount(procedureRouter);

/* seed and start */
function boot() {

  async.waterfall([

    function seedPermissions(next) {
      Permission.seed(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedRoles(next) {
      Role.seed(function (error, results) {
        roles = results;
        next();
      });
    },

    function seedParties(next) {
      Party.seed(function (error, results) {
        parties = results;
        next();
      });
    },

    function seedAlerts(next) {
      Alert.seed(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedItems(next) {
      Item.seed(function (error, results) {
        items = results;
        next();
      });
    },

    function seedStocks(next) {
      const stocks = _.map(items, (item, index) => {
        return {
          owner: parties[index % parties.length],
          item: item,
          quantity: Math.ceil(Math.random() * 1000),
          minAllowed: Math.ceil(Math.random() * 10),
          maxAllowed: Math.ceil(Math.random() * 10000),
        };
      });
      Stock.seed(stocks, ( /*error , stocks*/ ) => next());
    },

    function seedAdjustment(next) {
      const adjustments = _.map(items, (item) => {
        const adjustment = Adjustment.fake();
        adjustment.item = item;
        adjustment.quantity = Math.ceil(Math.random() * 100);
        adjustment.cost = Math.ceil(Math.random() * 10000);
        return adjustment;
      });
      Adjustment.insertMany(adjustments, ( /*error , stocks*/ ) => next());
    },

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
        plans[index].owner = parties[index % parties.length];
        plans[index].incidentType = incidentType;
      });
      Plan.insertMany(plans, next);
    },

    function seedActivities(plans, next) {
      const activities = Activity.fake(plans.length);
      _.forEach(plans, function (plan, index) {
        activities[index].plan = plan;
        activities[index].primary = _.sampleSize(roles, 1);
        activities[index].supportive = _.sampleSize(roles, 2);
      });
      Activity.insertMany(activities, next);
    },

    function seedProcedures(activities, next) {
      const procedures = Procedure.fake(activities.length);
      _.forEach(activities, function (activity, index) {
        procedures[index].activity = activity;
        procedures[index].number = (index % 2) + 1;
        procedures[index].primary = _.sampleSize(roles, 1);
        procedures[index].supportive = _.sampleSize(roles, 2);
      });
      Procedure.insertMany(procedures, next);
    }

  ], function (error, results) {

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
