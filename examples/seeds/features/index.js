'use strict';


/* dependencies */
const zones = require('./zones');
const regions = require('./regions');
const districts = require('./districts');
const wards = require('./wards');
const warehouses = require('./warehouses');

module.exports = exports = (
  [].concat(zones)
  .concat(regions)
  .concat(districts)
  .concat(wards)
  .concat(warehouses)
);
