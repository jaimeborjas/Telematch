const express = require('express');

const usersRouter = require('./users.router')

// Router that manages the '/api' endpoint
function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/users', usersRouter);
}

module.exports = routerApi