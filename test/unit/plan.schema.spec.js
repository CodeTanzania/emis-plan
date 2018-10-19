'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { IncidentType } = require('@codetanzania/emis-incident-type');
const Plan = require(path.join(__dirname, '..', '..', 'lib', 'plan.model'));


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
