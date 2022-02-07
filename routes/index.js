const express = require('express');

const usersRouter = require('./users.router')
const customersRouter = require('./customers.router')

// Router that manages the '/api' endpoint
function routerApi(app) {
    const router = express.Router();
    app.use('/', router);  
    router.use('/users', usersRouter);
    router.use('/customers', customersRouter);
}

module.exports = routerApi