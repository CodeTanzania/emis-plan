'use strict';


/* dependencies */
const app = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { include } = require('@lykmapipo/include');
const { jsonSchema } = require('@lykmapipo/mongoose-common');
const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const { featureRouter } = require('@codetanzania/emis-feature');
const { roleRouter } = require('@codetanzania/emis-role');
const { partyRouter } = require('@codetanzania/emis-stakeholder');
const { alertSourceRouter, alertRouter } = require('@codetanzania/emis-alert');
const { incidentTypeRouter } = require('@codetanzania/emis-incident-type');
const {
  warehouseRouter,
  itemRouter,
  stockRouter,
  adjustmentRouter
} = require('@codetanzania/emis-resource');
const {
  indicatorRouter,
  questionRouter,
  questionnaireRouter
} = require('@codetanzania/emis-questionnaire');
const {
  incidentRouter,
  actionRouter,
  taskRouter
} = require('@codetanzania/emis-incident');
const {
  planRouter,
  activityRouter,
  procedureRouter,
  apiVersion,
  info
} = include(__dirname, '..');


/* mount routers */
app.mount(predefineRouter);
app.mount(incidentTypeRouter);
app.mount(indicatorRouter);
app.mount(questionRouter);
app.mount(questionnaireRouter);
app.mount(featureRouter);
app.mount(permissionRouter);
app.mount(roleRouter);
app.mount(partyRouter);
app.mount(alertSourceRouter);
app.mount(alertRouter);
app.mount(warehouseRouter);
app.mount(itemRouter);
app.mount(stockRouter);
app.mount(adjustmentRouter);
app.mount(planRouter);
app.mount(activityRouter);
app.mount(procedureRouter);
app.mount(incidentRouter);
app.mount(actionRouter);
app.mount(taskRouter);


// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) { throw error; }

  // expose module info
  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // expose api schemas
  app.get(`/${apiVersion}/schemas`, function (request, response) {
    const schema = jsonSchema();
    response.status(200);
    response.json(schema);
  });

  // fire the app
  app.start((error, env) => {
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });

});
