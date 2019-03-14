'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall, parallel } = require('async');
const { include } = require('@lykmapipo/include');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Feature } = require('@codetanzania/emis-feature');
const { Permission } = require('@lykmapipo/permission');
const { Predefine } = require('@lykmapipo/predefine');
const { Role } = require('@codetanzania/emis-role');
const { Party } = require('@codetanzania/emis-stakeholder');
const {
  Indicator,
  Question,
  Questionnaire
} = require('@codetanzania/emis-questionnaire');
const {
  Item,
  Stock,
  Adjustment
} = require('@codetanzania/emis-resource');
const {
  AlertSource,
  Alert
} = require('@codetanzania/emis-alert');
const {
  Plan,
  Activity,
  Procedure,
} = include(__dirname, '..');
const {
  Incident,
  Action,
  Task
} = require('@codetanzania/emis-incident');


// naive logger
const log = (stage, error, result) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }
  if (result) {
    const val = _.isArray(result) ? result.length : result;
    console.info(`${stage} seed result`, val);
  }
};


/* refs */
let seedStart;
let seedEnd;
let predefines;
let incidentTypes;
let features;
let warehouses;
let wards;
let indicators;
let items;
let alertsources;
let permissions;
let roles;
let parties;
let stocks;
let questions;
let questionnaires;
let adjustments;
let plans;
let activities;
let procedures;
let alerts;
let incidents;
let actions;
let tasks;


// clear fakes
const cleanup = next => {
  const models = [
    'Task', 'Action', 'Incident', 'Alert',
    'Adjustment', 'Questionnaire', 'Question',
    'Procedure', 'Activity', 'Plan', 'Stock',
    'Party', 'Role', 'AlertSource', 'Item',
    'Indicator', 'Feature', 'IncidentType',
    'Permission', 'Predefine'
  ];
  clear(models, (error) => next(error));
};


// with no deps
const seedPredefines = next => {
  Predefine.seed((error, seeded) => {
    log('predefines', error, seeded);
    predefines = seeded;
    next(error);
  });
};

const seedPermissions = next => {
  Permission.seed((error, seeded) => {
    log('permissions', error, seeded);
    permissions = seeded;
    next(error);
  });
};

const seedIncidentTypes = next => {
  IncidentType.seed((error, seeded) => {
    log('incident types', error, seeded);
    incidentTypes = seeded;
    next(error);
  });
};

const seedFeatures = next => {
  Feature.seed((error, seeded) => {
    log('features', error, seeded);
    features = seeded;
    warehouses =
      _.filter(features, feature => feature.family === 'Warehouse');
    wards = _.filter(features, feature => feature.type === 'Ward');
    next(error);
  });
};

const seedIndicators = next => {
  Indicator.seed((error, seeded) => {
    log('indicators', error, seeded);
    indicators = seeded;
    next(error);
  });
};

const seedItems = next => {
  Item.seed((error, seeded) => {
    log('items', error, seeded);
    items = seeded;
    next(error);
  });
};

const seedAlertSources = next => {
  AlertSource.seed((error, seeded) => {
    log('alertsources', error, seeded);
    alertsources = seeded;
    next(error);
  });
};


// with deps
const seedRoles = next => {
  Role.seed((error, seeded) => {
    log('roles', error, seeded);
    roles = seeded;
    next(error);
  });
};

const seedParties = next => {
  parties = include(__dirname, 'seeds', 'parties');
  parties = _.map(parties, party => {
    party.location = _.sample(wards);
    party.role = _.sample(roles);
    return party;
  });
  Party.seed(parties, (error, seeded) => {
    log('parties', error, seeded);
    parties = seeded;
    next(error);
  });
};

const seedQuestions = next => {
  Question.seed((error, seeded) => {
    log('questions', error, seeded);
    questions = seeded;
    next(error);
  });
};

const seedQuestionnaires = next => {
  Questionnaire.seed(questionnaires, (error, seeded) => {
    log('questionnaires', error, seeded);
    questionnaires = seeded;
    next(error);
  });
};

const seedStocks = next => { //TODO use seed file
  stocks = _.map(items, item => {
    return {
      store: _.sample(warehouses),
      owner: _.sample(parties),
      item: item,
      quantity: Math.ceil(Math.random() * 1000),
      minAllowed: Math.ceil(Math.random() * 10),
      maxAllowed: Math.ceil(Math.random() * 10000),
    };
  });
  Stock.seed(stocks, (error, seeded) => {
    log('stocks', error, seeded);
    stocks = seeded;
    next(error);
  });
};

const seedPlans = next => { //TODO use seed file
  plans = _.map(incidentTypes, incidentType => {
    return {
      owner: _.find(parties, { abbreviation: 'DARMAERT' }),
      incidentType: incidentType,
      boundary: _.find(features, { name: 'Dar-es-salaam' })
    };
  });
  Plan.insertMany(plans, (error, seeded) => {
    log('plans', error, seeded);
    plans = seeded;
    next(error);
  });
};

const seedActivities = next => { //TODO use seed file
  activities = include(__dirname, 'seeds', 'activities');
  activities = _.map(plans, (plan, index) => {
    return _.map(activities, activity => {
      activity.plan = plan;
      activity.primary = _.sampleSize(roles, 1);
      activity.supportive = _.sampleSize(roles, 2);
      return activity;
    });
  });
  activities = _.flattenDeep(activities);
  Activity.insertMany(activities, (error, seeded) => {
    log('activities', error, seeded);
    activities = seeded;
    next(error);
  });
};

const seedProcedures = next => {
  procedures = Procedure.fake(activities.length);
  _.forEach(activities, (activity, index) => {
    procedures[index].activity = activity;
    procedures[index].number = (index % 2) + 1;
    procedures[index].primary = _.sampleSize(roles, 1);
    procedures[index].supportive = _.sampleSize(roles, 2);
  });
  Procedure.insertMany(procedures, (error, seeded) => {
    log('procedures', error, seeded);
    procedures = seeded;
    next(error);
  });
};

const seedAdjustments = next => { //TODO use seed file
  adjustments = _.map(stocks, (stock) => {
    const adjustment = Adjustment.fake();
    adjustment.item = stock.item;
    adjustment.stock = stock;
    adjustment.store = stock.store;
    adjustment.party = stock.owner;
    adjustment.quantity = Math.ceil(Math.random() * 100);
    adjustment.cost = Math.ceil(Math.random() * 10000);
    return adjustment;
  });
  Adjustment.insertMany(adjustments, (error, seeded) => {
    log('adjustments', error, seeded);
    adjustments = seeded;
    next(error);
  });
};

const seedAlerts = next => {
  Alert.seed((error, seeded) => {
    log('alerts', error, seeded);
    alerts = seeded;
    next(error);
  });
};

const seedIncidents = next => { //TODO use seed file
  incidents = Incident.fake(incidentTypes.length);
  _.forEach(incidentTypes, (incidentType, index) => {
    incidents[index].type = incidentType;
  });
  Incident.insertMany(incidents, (error, seeded) => {
    log('incidents', error, seeded);
    incidents = seeded;
    next(error);
  });
};

const seedActions = next => { //TODO use seed file
  actions = Action.fake(incidents.length);
  _.forEach(incidents, (incident, index) => {
    actions[index].incident = incident;
  });
  Action.insertMany(actions, (error, seeded) => {
    log('actions', error, seeded);
    actions = seeded;
    next(error);
  });
};


const seedTasks = next => { //TODO use seed file
  tasks = Task.fake(actions.length);
  _.forEach(actions, (action, index) => {
    tasks[index].action = action;
    tasks[index].number = (index % 2) + 1;
  });
  Task.insertMany(tasks, (error, seeded) => {
    log('tasks', error, seeded);
    tasks = seeded;
    next(error);
  });
};


// stage one seeding
const seedStageOne = next => parallel([
  seedPredefines, seedPermissions, seedIncidentTypes,
  seedFeatures, seedIndicators,
  seedItems, seedAlertSources
], (error) => next(error));

// stage two seeding
const seedStageTwo = next => waterfall([
  seedRoles, seedParties,
  seedStocks, seedPlans,
  seedActivities, seedProcedures
], (error) => next(error));

// stage three seeding
const seedStageThree = next => waterfall([
  seedQuestions, seedQuestionnaires,
  seedAdjustments, seedAlerts,
  seedIncidents, seedActions,
  seedTasks
], (error) => next(error));


// seed work
const seed = done => {
  seedStart = Date.now();
  connect(error => {
    if (error) { return done(error); }
    waterfall([
      cleanup, seedStageOne,
      seedStageTwo, seedStageThree
    ], done);
  });
};


// do seeding
seed((error, results = [true]) => {
  seedEnd = Date.now();
  log('time', null, seedEnd - seedStart);
  log('final', error, results);
  process.exit(0);
});
