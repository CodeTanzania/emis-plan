'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Activity } = require(path.join(__dirname, '..', '..'));

describe('Activity Statics', () => {

  it('should expose model name as constant', () => {
    expect(Activity.MODEL_NAME).to.exist;
    expect(Activity.MODEL_NAME).to.be.equal('Activity');
  });

  it('should expose collection name as constant', () => {
    expect(Activity.COLLECTION_NAME).to.exist;
    expect(Activity.COLLECTION_NAME).to.be.equal('activities');
  });

});
