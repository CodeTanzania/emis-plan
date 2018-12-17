'use strict';


/* dependencies */
const zones = require('./zones');
const regions = require('./regions');
const warehouses = require('./warehouses');

module.exports = exports = (
  [].concat(zones)
  .concat(regions)
  .concat(warehouses)
);
