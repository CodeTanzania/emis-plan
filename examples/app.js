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
const { include } = require('@lykmapipo/include');
const { jsonSchema } = require('@lykmapipo/mongoose-common');
const { Permission, permissionRouter } = require('@lykmapipo/permission');
const { Feature, featureRouter } = require('@codetanzania/emis-feature');
const { Role, roleRouter } = require('@codetanzania/emis-role');
const { Party, partyRouter } = require('@codetanzania/emis-stakeholder');
const {
  AlertSource,
  Alert,
  alertSourceRouter,
  alertRouter
} = require('@codetanzania/emis-alert');
const {
  Warehouse,
  Item,
  Stock,
  Adjustment,
  warehouseRouter,
  itemRouter,
  stockRouter,
  adjustmentRouter
} = require('@codetanzania/emis-resource');
const {
  Indicator,
  Question,
  Questionnaire,
  indicatorRouter,
  questionRouter,
  questionnaireRouter
} = require('@codetanzania/emis-questionnaire');
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
  apiVersion,
  info
} = require(path.join(__dirname, '..'));

/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


/* refs */
let features;
let warehouses;
let parties;
let roles;
let items;


/* mount routers */
app.mount(incidentTypeRouter);
app.mount(indicatorRouter);
app.mount(questionRouter);
app.mount(questionnaireRouter);
app.mount(featureRouter);
app.mount(permissionRouter);
app.mount(roleRouter);
app.mount(partyRouter);
app.mount(alertSourceRouter);
app.mount(alertRouter);
app.mount(warehouseRouter);
app.mount(itemRouter);
app.mount(stockRouter);
app.mount(adjustmentRouter);
app.mount(planRouter);
app.mount(activityRouter);
app.mount(procedureRouter);

/* seed and start */
function boot() {

  const startedAt = new Date();
  console.log('Seed Start', startedAt);

  async.waterfall([
    function clearQuestionnaires(next) {
      Questionnaire.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearQuestions(next) {
      Question.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearIndicators(next) {
      Indicator.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedIndicators(next) {
      const indicators = Indicator.fake(5);
      Indicator.seed(indicators, next);
    },

    function seedQuestions(indicators, next) {
      let questions = Question.fake(indicators.length);
      questions = _.map(questions, function (question, index) {
        questions[index].indicator = indicators[index];
        return question;
      });
      Question.seed(questions, next);
    },

    function seedQuestionnaires(questions, next) {
      const questionnaire = Questionnaire.fake();
      questionnaire.questions = [...questions];
      Questionnaire.seed(questionnaire, function ( /*error, results*/ ) {
        next();
      });
    },

    function seedPermissions(next) {
      Permission.seed(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedFeatures(next) {
      Feature.seed(function (error, results) {
        features = results;
        warehouses =
          _.filter(features, feature => feature.type === 'Warehouse');
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

    function seedAlertSources(next) {
      AlertSource.seed(function ( /*error, results*/ ) {
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
          store: warehouses[index % warehouses.length],
          owner: parties[index % parties.length],
          item: item,
          quantity: Math.ceil(Math.random() * 1000),
          minAllowed: Math.ceil(Math.random() * 10),
          maxAllowed: Math.ceil(Math.random() * 10000),
        };
      });
      Stock.seed(stocks, next);
    },

    function seedAdjustment(stocks, next) {
      const adjustments = _.map(stocks, (stock) => {
        const adjustment = Adjustment.fake();
        adjustment.item = stock.item;
        adjustment.stock = stock;
        adjustment.store = stock.store;
        adjustment.party = stock.owner;
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
      const plans = _.map(incidentTypes, function (incidentType, index) {
        return {
          owner: _.find(parties, { abbreviation: 'DARMAERT' }),
          incidentType: incidentType,
          boundary: _.find(features, { name: 'Dar-es-salaam' })
        };
      });
      Plan.insertMany(plans, next);
    },

    function seedActivities(plans, next) {
      let activities = include(__dirname, 'seeds', 'activities');
      activities = _.map(plans, function (plan, index) {
        return _.map(activities, function (activity) {
          activity.plan = plan;
          activity.primary = _.sampleSize(roles, 1);
          activity.supportive = _.sampleSize(roles, 2);
          return activity;
        });
      });
      activities = _.flattenDeep(activities);
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
    console.log(error);
    const endedAt = new Date();
    console.log('Seed End', endedAt);
    console.log('Seed Time', endedAt.getTime() - startedAt.getTime());

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* expose api schemas */
    app.get(`/v${apiVersion}/schemas`, function (request, response) {
      const schema = jsonSchema();
      response.status(200);
      response.json(schema);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
