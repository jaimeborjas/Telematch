const express = require('express');

const usersRouter = require('./users.router')
const userInfoRouter = require('./userInfo.router')
const authRouter = require('./auth.router')

// Router that manages the '/api' endpoint
function routerApi(app) {
    const router = express.Router();
    app.use('/', router);  
    router.use('/users', usersRouter);
    router.use('/userinfo', userInfoRouter);
    router.use('/auth', authRouter);
}

module.exports = routerApi