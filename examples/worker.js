'use strict';

/* dependencies */
const path = require('path');
const { connect } = require('@lykmapipo/mongoose-common');
require(path.join(__dirname, '..'));
const { fetchContacts } = require('@codetanzania/emis-stakeholder');
const { worker, httpServer, listen } = require('@lykmapipo/postman')({
  fetchContacts,
});

/* connect to mongoose */
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  /* start worker */
  worker.queue.on('job error', function(error) {
    console.log('job error', error);
  });

  worker.queue.on('error', function(error) {
    console.log('worker error', error);
  });

  worker.start();

  // listen();
});
