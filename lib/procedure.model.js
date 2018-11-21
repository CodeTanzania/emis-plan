'use strict';


/**
 * @module Procedure
 * @name Procedure
 * @description Describe a specific task or step. It specified way to carry
 * out an activity.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { getString, getStrings } = require('@lykmapipo/env');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Item } = require('@codetanzania/emis-resource');
const Plan = require(path.join(__dirname, 'plan.model'));
const Activity = require(path.join(__dirname, 'activity.model'));
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const PROCEDURE_MODEL_NAME =
  getString('PROCEDURE_MODEL_NAME', 'Procedure');
const PROCEDURE_COLLECTION_NAME =
  getString('PROCEDURE_COLLECTION_NAME', 'procedures');
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: PROCEDURE_COLLECTION_NAME
});
const DEFAULT_DISASTER_PHASE = getString('DEFAULT_DISASTER_PHASE', 'Mitigation');
const DEFAULT_DISASTER_PHASES = [
  'Mitigation', 'Preparedness',
  'Response', 'Recovery'
];
const DISASTER_PHASES = getStrings('DISASTER_PHASES', DEFAULT_DISASTER_PHASES);
const OPTION_AUTOPOPULATE = {
  maxDepth: 1
};

/**
 * @name ProcedureSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ProcedureSchema = new Schema({
  /**
   * @name plan
   * @description A plan under which a procedure is applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - auto population(eager loading) options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  plan: {
    type: ObjectId,
    ref: Plan.MODEL_NAME,
    required: true,
    index: true,
    exists: true,
    autopopulate: Plan.OPTION_AUTOPOPULATE
  },


  /**
   * @name incidentType
   * @description An incident type under which a procedure is applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - auto population(eager loading) options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  incidentType: {
    type: ObjectId,
    ref: IncidentType.MODEL_NAME,
    required: true,
    index: true,
    exists: true,
    autopopulate: IncidentType.OPTION_AUTOPOPULATE
  },


  /**
   * @name activity
   * @description Activity under which a procedure is applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - auto population(eager loading) options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  activity: {
    type: ObjectId,
    ref: Activity.MODEL_NAME,
    required: true,
    index: true,
    exists: true,
    autopopulate: Activity.OPTION_AUTOPOPULATE
  },


  /**
   * @name phase
   * @description disaster management phase under which procedure applicable.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} enum - list of acceptable values
   * @property {object} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phase: {
    type: String,
    trim: true,
    enum: DISASTER_PHASES,
    default: undefined,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name name
   * @description Human readable name of procedure.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {number} minlength - ensure not empty
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
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
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name description
   * @description A brief summary about a procedure if available i.e
   * additional details that clarify what a procedure is for.
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
   * @name number
   * @description Procedure number(or sequence) for ordering in relation to
   * other activity procedures.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   * @property {number} min - minimum value allowed
   * @property {number} max - maximum value allowed
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  number: {
    type: Number,
    index: true,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    fake: {
      generator: 'random',
      type: 'number'
    }
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
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


/* TODO */


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @function validate
 * @description procedure schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
ProcedureSchema.pre('validate', function (done) {

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
 * @description procedure schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ProcedureSchema.methods.preValidate = function preValidate(done) {

  //ensure plan
  if (!this.plan && this.activity) {
    this.plan = this.activity.plan;
  }

  //ensure incident type
  if (!this.incidentType && this.plan) {
    this.incidentType = this.plan.incidentType;
  }

  //ensure disaster phase
  if (_.isEmpty(this.phase)) {
    this.phase = (
      this.activity ? this.activity.phase : DEFAULT_DISASTER_PHASE
    );
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
ProcedureSchema.statics.MODEL_NAME = PROCEDURE_MODEL_NAME;
ProcedureSchema.statics.COLLECTION_NAME = PROCEDURE_COLLECTION_NAME;
ProcedureSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
ProcedureSchema.plugin(actions);


/* export procedure model */
module.exports = mongoose.model(PROCEDURE_MODEL_NAME, ProcedureSchema);
