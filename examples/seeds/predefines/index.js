'use strict';

/* dependencies */
const units = require('./units');
const categories = require('./categories');
const groups = require('./partygroups');

module.exports = exports = [...units, ...categories, ...groups];
