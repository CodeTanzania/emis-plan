'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const Plan = require(path.join(__dirname, '..', '..', 'lib', 'plan.model'));
const Activity =
  require(path.join(__dirname, '..', '..', 'lib', 'activity.model'));


describe('Activity Schema', () => {

  it('should have plan field', () => {
    const plan = Activity.path('plan');

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
    const incidentType = Activity.path('incidentType');

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

  it('should have phase field', () => {
    const phase = Activity.path('phase');

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
    const name = Activity.path('name');

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
    const description = Activity.path('description');

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

});
