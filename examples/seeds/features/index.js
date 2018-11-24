'use strict';


/* dependencies */
const zones = require('./zones');
const regions = require('./regions');
const districts = require('./districts');
const wards = require('./wards');

let features = [].concat(zones).concat(regions).concat(districts).concat(wards);
module.exports = exports = features;
