'use strict';


/**
 * @module Plan
 * @name Plan
 * @description A representation of written set of activities and procedures
 * that outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { getString } = require('@lykmapipo/env');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const PLAN_MODEL_NAME =
  getString('PLAN_MODEL_NAME', 'Plan');
const PLAN_COLLECTION_NAME =
  getString('PLAN_COLLECTION_NAME', 'plans');
const SCHEMA_OPTIONS =
  ({ timestamps: true, emitIndexErrors: true, collection: PLAN_COLLECTION_NAME });
const OPTION_AUTOPOPULATE = {
  maxDepth: 1
};
/* TODO add autopopulate option */


/**
 * @name PlanSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const PlanSchema = new Schema({
  /**
   * @name incidentType
   * @description An incident type under which a plan is applicable.
   *
   * If not available a plan is applicable to all incident type.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  incidentType: {
    type: ObjectId,
    ref: IncidentType.MODEL_NAME,
    exists: true,
    autopopulate: IncidentType.OPTION_AUTOPOPULATE,
    index: true
  },


  /**
   * @name description
   * @description A brief summary about a plan if available i.e
   * additional details that clarify what a plan is for.
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
   * @name publishedAt
   * @description Date when plan was made effective for use.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * 2018-10-19T07:53:32.831Z
   */
  publishedAt: {
    type: Date,
    index: true,
    fake: {
      generator: 'date',
      type: 'recent'
    }
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
 * @description plan schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PlanSchema.pre('validate', function (done) {

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
 * @description plan schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PlanSchema.methods.preValidate = function preValidate(done) {

  // continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PlanSchema.statics.MODEL_NAME = PLAN_MODEL_NAME;
PlanSchema.statics.COLLECTION_NAME = PLAN_COLLECTION_NAME;
PlanSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
PlanSchema.plugin(actions);


/* export plan model */
module.exports = mongoose.model(PLAN_MODEL_NAME, PlanSchema);
