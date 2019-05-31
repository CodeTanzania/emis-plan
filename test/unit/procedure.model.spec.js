'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Procedure } = include(__dirname, '..', '..');

describe('Procedure Statics', () => {
  it('should expose model name as constant', () => {
    expect(Procedure.MODEL_NAME).to.exist;
    expect(Procedure.MODEL_NAME).to.be.equal('Procedure');
  });

  it('should expose collection name as constant', () => {
    expect(Procedure.COLLECTION_NAME).to.exist;
    expect(Procedure.COLLECTION_NAME).to.be.equal('procedures');
  });
});
