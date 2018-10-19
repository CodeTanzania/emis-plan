'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Procedure =
  require(path.join(__dirname, '..', '..', 'lib', 'procedure.model'));

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
