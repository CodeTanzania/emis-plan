'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Plan } = include(__dirname, '..', '..');

describe('Plan Statics', () => {
  it('should expose model name as constant', () => {
    expect(Plan.MODEL_NAME).to.exist;
    expect(Plan.MODEL_NAME).to.be.equal('Plan');
  });

  it('should expose collection name as constant', () => {
    expect(Plan.COLLECTION_NAME).to.exist;
    expect(Plan.COLLECTION_NAME).to.be.equal('plans');
  });
});
