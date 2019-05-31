'use strict';

/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
require(path.join(__dirname, '..'));
const { worker, httpServer } = require('@lykmapipo/postman');

/* connect to mongoose */
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/emis-plan';
mongoose.connect(process.env.MONGODB_URI);

/* start worker */
worker.queue.on('job error', function(error) {
  console.log('job error', error);
});

worker.queue.on('error', function(error) {
  console.log('worker error', error);
});

worker.start();
