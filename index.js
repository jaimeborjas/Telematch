const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')

const { errorHandler, logErrors, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');
const { application_name } = require('pg/lib/defaults');

const app = express();
const port = process.env.PORT || 3000;

//express middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

require('./utils/auth')


routerApi(app); // initialize the router

// middleware to handle errors
app.use(logErrors);
app.use(boomErrorHandler);
app.use(sequelizeErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log('Listening on port 3000'))