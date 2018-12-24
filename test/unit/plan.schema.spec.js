'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Schema } = require('mongoose');
const { Feature } = require('@codetanzania/emis-feature');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Plan } = include(__dirname, '..', '..');


describe('Plan Schema', () => {

  it('should have incidentType field', () => {
    const incidentType = Plan.path('incidentType');

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

  it('should have boundary field', () => {
    const boundary = Plan.path('boundary');

    expect(boundary).to.exist;
    expect(boundary).to.be.instanceof(Schema.Types.ObjectId);
    expect(boundary.options).to.exist;
    expect(boundary.options).to.be.an('object');
    expect(boundary.options.type).to.exist;
    expect(boundary.options.ref).to.exist;
    expect(boundary.options.ref).to.be.equal(Feature.MODEL_NAME);
    expect(boundary.options.index).to.be.true;
    expect(boundary.options.autopopulate).to.exist;
  });

  it('should have owner field', () => {
    const owner = Plan.path('owner');

    expect(owner).to.exist;
    expect(owner).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(owner.options).to.exist;
    expect(owner.options).to.be.an('object');
    expect(owner.options.type).to.exist;
    expect(owner.options.ref).to.exist;
    expect(owner.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(owner.options.exists).to.be.true;
    expect(owner.options.autopopulate).to.exist;
    expect(owner.options.index).to.be.true;
  });

  it('should have description field', () => {
    const description = Plan.path('description');

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

  it('should have publishedAt field', () => {
    const publishedAt = Plan.path('publishedAt');

    expect(publishedAt).to.exist;
    expect(publishedAt).to.be.instanceof(Schema.Types.Date);
    expect(publishedAt.options).to.exist;
    expect(publishedAt.options).to.be.an('object');
    expect(publishedAt.options.type).to.exist;
    expect(publishedAt.options.index).to.be.true;
    expect(publishedAt.options.fake).to.exist;
  });

});
