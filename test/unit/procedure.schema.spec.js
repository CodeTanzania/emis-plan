'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Schema } = require('mongoose');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Role } = require('@codetanzania/emis-stakeholder');
const { Item } = require('@codetanzania/emis-resource');
const { Questionnaire } = require('@codetanzania/emis-questionnaire');
const { Procedure, Activity, Plan } = include(__dirname, '..', '..');

describe('Procedure Schema', () => {
  it('should have plan field', () => {
    const plan = Procedure.path('plan');

    expect(plan).to.exist;
    expect(plan).to.be.instanceof(Schema.Types.ObjectId);
    expect(plan.options).to.exist;
    expect(plan.options).to.be.an('object');
    expect(plan.options.type).to.exist;
    expect(plan.options.ref).to.exist;
    expect(plan.options.ref).to.be.equal(Plan.MODEL_NAME);
    expect(plan.options.required).to.be.true;
    expect(plan.options.index).to.be.true;
    expect(plan.options.exists).to.be.true;
  });

  it('should have incidentType field', () => {
    const incidentType = Procedure.path('incidentType');

    expect(incidentType).to.exist;
    expect(incidentType).to.be.instanceof(Schema.Types.ObjectId);
    expect(incidentType.options).to.exist;
    expect(incidentType.options).to.be.an('object');
    expect(incidentType.options.type).to.exist;
    expect(incidentType.options.ref).to.exist;
    expect(incidentType.options.ref).to.be.equal(IncidentType.MODEL_NAME);
    expect(incidentType.options.index).to.be.true;
    expect(incidentType.options.autopopulate).to.exist;
  });

  it('should have activity field', () => {
    const activity = Procedure.path('activity');

    expect(activity).to.exist;
    expect(activity).to.be.instanceof(Schema.Types.ObjectId);
    expect(activity.options).to.exist;
    expect(activity.options).to.be.an('object');
    expect(activity.options.type).to.exist;
    expect(activity.options.ref).to.exist;
    expect(activity.options.ref).to.be.equal(Activity.MODEL_NAME);
    expect(activity.options.index).to.be.true;
  });

  it('should have phase field', () => {
    const phase = Procedure.path('phase');

    expect(phase).to.exist;
    expect(phase).to.be.instanceof(Schema.Types.String);
    expect(phase.options).to.exist;
    expect(phase.options).to.be.an('object');
    expect(phase.options.type).to.exist;
    expect(phase.options.trim).to.be.true;
    expect(phase.options.enum).to.exist;
    expect(phase.options.default).to.be.undefined;
    expect(phase.options.index).to.be.true;
    expect(phase.options.searchable).to.be.true;
    expect(phase.options.fake).to.exist;
  });

  it('should have name field', () => {
    const name = Procedure.path('name');

    expect(name).to.exist;
    expect(name).to.be.instanceof(Schema.Types.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.required).to.be.true;
    expect(name.options.minlength).to.be.be.at.least(1);
    expect(name.options.searchable).to.be.true;
    expect(name.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = Procedure.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(Schema.Types.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have number field', () => {
    const number = Procedure.path('number');

    expect(number).to.exist;
    expect(number).to.be.instanceof(Schema.Types.Number);
    expect(number.options).to.exist;
    expect(number.options).to.be.an('object');
    expect(number.options.type).to.exist;
    expect(number.options.min).to.be.exist;
    expect(number.options.max).to.be.exist;
    expect(number.options.index).to.be.true;
    expect(number.options.fake).to.exist;
  });

  it('should have primary roles field', () => {
    const primary = Procedure.path('primary');

    expect(primary).to.exist;
    expect(primary).to.be.instanceof(Schema.Types.Array);
    expect(primary.options).to.exist;
    expect(primary.options).to.be.an('object');
    expect(primary.options.type).to.exist;
    expect(primary.options.ref).to.exist;
    expect(primary.options.ref).to.be.equal(Role.MODEL_NAME);
    expect(primary.options.default).to.be.undefined;
    expect(primary.options.index).to.be.true;
    expect(primary.options.autopopulate).to.be.exist;
  });

  it('should have supportive roles field', () => {
    const supportive = Procedure.path('supportive');

    expect(supportive).to.exist;
    expect(supportive).to.be.instanceof(Schema.Types.Array);
    expect(supportive.options).to.exist;
    expect(supportive.options).to.be.an('object');
    expect(supportive.options.type).to.exist;
    expect(supportive.options.ref).to.exist;
    expect(supportive.options.ref).to.be.equal(Role.MODEL_NAME);
    expect(supportive.options.default).to.be.undefined;
    expect(supportive.options.index).to.be.true;
    expect(supportive.options.autopopulate).to.be.exist;
  });

  it('should have resources field', () => {
    const resources = Procedure.path('resources');

    expect(resources).to.exist;
    expect(resources).to.be.instanceof(Schema.Types.Array);
    expect(resources.options).to.exist;
    expect(resources.options).to.be.an('object');
    expect(resources.options.type).to.exist;
    expect(resources.options.ref).to.exist;
    expect(resources.options.ref).to.be.equal(Item.MODEL_NAME);
    expect(resources.options.default).to.be.undefined;
    expect(resources.options.index).to.be.true;
    expect(resources.options.autopopulate).to.be.exist;
  });

  it('should have assessments field', () => {
    const assessments = Procedure.path('assessments');

    expect(assessments).to.exist;
    expect(assessments).to.be.instanceof(Schema.Types.Array);
    expect(assessments.options).to.exist;
    expect(assessments.options).to.be.an('object');
    expect(assessments.options.type).to.exist;
    expect(assessments.options.ref).to.exist;
    expect(assessments.options.ref).to.be.equal(Questionnaire.MODEL_NAME);
    expect(assessments.options.default).to.be.undefined;
    expect(assessments.options.index).to.be.true;
    expect(assessments.options.autopopulate).to.be.exist;
  });
});
