'use strict';

/* dependencies */
const regions = require('./regions');
const districts = require('./districts');
const wards = require('./wards');
const warehouses = require('./warehouses');

module.exports = exports = [...regions, ...districts, ...wards, ...warehouses];
