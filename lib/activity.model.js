'use strict';


/**
 * @module Activity
 * @name Activity
 * @description Define a specific action or function.
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
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const _ = require('lodash');
const { getString, getStrings } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const { Schema, SchemaTypes } = require('@lykmapipo/mongoose-common');
const { model, SCHEMA_OPTIONS } = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Role } = require('@codetanzania/emis-stakeholder');
const { Item } = require('@codetanzania/emis-resource');
const { Questionnaire } = require('@codetanzania/emis-questionnaire');
const Plan = include(__dirname, 'plan.model');
const { ObjectId } = SchemaTypes;


/* constants */
const POPULATION_MAX_DEPTH = 1;
const ACTIVITY_MODEL_NAME = getString('ACTIVITY_MODEL_NAME', 'Activity');
const ACTIVITY_COLLECTION_NAME =
  getString('ACTIVITY_COLLECTION_NAME', 'activities');
const DEFAULT_DISASTER_PHASE = getString('DEFAULT_DISASTER_PHASE', 'Mitigation');
const DEFAULT_DISASTER_PHASES = [
  'Mitigation', 'Preparedness',
  'Response', 'Recovery'
];
const DISASTER_PHASES = getStrings('DISASTER_PHASES', DEFAULT_DISASTER_PHASES);
const OPTION_AUTOPOPULATE = {
  maxDepth: POPULATION_MAX_DEPTH
};


/**
 * @name ActivitySchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ActivitySchema = new Schema({
  /**
   * @name plan
   * @description A plan under which a activity is applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options
   * @property {boolean} taggable - allow field use for tagging
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  plan: {
    type: ObjectId,
    ref: Plan.MODEL_NAME,
    required: true,
    exists: true,
    index: true,
    autopopulate: Plan.OPTION_AUTOPOPULATE,
    taggable: true
  },


  /**
   * @name incidentType
   * @description An incident type under which a activity is applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options,
   * @property {boolean} taggable - allow field use for tagging
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  incidentType: {
    type: ObjectId,
    ref: IncidentType.MODEL_NAME,
    required: true,
    exists: true,
    index: true,
    autopopulate: IncidentType.OPTION_AUTOPOPULATE,
    taggable: true
  },


  /**
   * @name phase
   * @description Disaster management phase under which activity applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} default - default value if non provided
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phase: {
    type: String,
    trim: true,
    enum: DISASTER_PHASES,
    index: true,
    searchable: true,
    taggable: true,
    default: undefined,
    fake: true
  },


  /**
   * @name name
   * @description Human readable name of activity.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {number} minlength - ensure not empty
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    index: true,
    searchable: true,
    taggable: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name description
   * @description A brief summary about a activity if available i.e
   * additional details that clarify what a activity is for.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  description: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name primary
   * @description Set of primary responsible party(i.e agency,
   * organization etc) roles that may be required to perform an activity.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * [{
   *   _id: "5bcda2c073dd0700048fb846",
   *   "name": "Ward Executive Officer",
   *   "abbreviation": "WEO",
   *   "description": "Ward Executive Officer"
   * }]
   */
  primary: {
    type: [ObjectId],
    ref: Role.MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: Role.OPTION_AUTOPOPULATE
  },


  /**
   * @name supportive
   * @description Set of supportive party(i.e agency, organization etc) roles
   * that may assist in performing an activity.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * [{
   *   _id: "5bcda2c073dd0700048fb846",
   *   "name": "Ward Executive Officer",
   *   "abbreviation": "WEO",
   *   "description": "Ward Executive Officer"
   * }]
   */
  supportive: {
    type: [ObjectId],
    ref: Role.MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: Role.OPTION_AUTOPOPULATE
  },


  /**
   * @name resources
   * @description Set of possible resource(or item) that may be required to
   * perform an activity.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * [{
   *   _id: "5bcda2c073dd0700048fb846",
   *   "type": "Vehicle",
   *   "code": "VHC",
   *   "name": "Ambulance"
   * }]
   */
  resources: {
    type: [ObjectId],
    ref: Item.MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: Item.OPTION_AUTOPOPULATE
  },


  /**
   * @name assessments
   * @description Set of assessments that may be performed on an activity.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - auto population(eager loading) options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * [{
   *   "_id": "5c07af709404b82c5efdb438",
   *   "assess": "Need",
   *   "stage": "During",
   *   "phase": "Response",
   *   "title": "Need Assessment",
   * }]
   */
  assessments: {
    type: [ObjectId],
    ref: Questionnaire.MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: Questionnaire.OPTION_AUTOPOPULATE
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @function validate
 * @description activity schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
ActivitySchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @function preValidate
 * @description activity schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ActivitySchema.methods.preValidate = function preValidate(done) {

  //ensure incident type
  if (!this.incidentType && this.plan) {
    this.incidentType = this.plan.incidentType;
  }

  //ensure disaster phase
  if (_.isEmpty(this.phase)) {
    this.phase = DEFAULT_DISASTER_PHASE;
  }

  // continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
ActivitySchema.statics.MODEL_NAME = ACTIVITY_MODEL_NAME;
ActivitySchema.statics.COLLECTION_NAME = ACTIVITY_COLLECTION_NAME;
ActivitySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
ActivitySchema.plugin(actions);


/* export activity model */
module.exports = model(ACTIVITY_MODEL_NAME, ActivitySchema);
