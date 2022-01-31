const express = require('express');

const usersRouter = require('./users.router')
const loginRouter = require('./login.router')
const signupRouter = require('./signup.router')
const profileRouter = require('./users.router')
const chatRouter = require('./chat.router')

// Router that manages the '/api' endpoint
function routerApi(app) {
    const router = express.Router();
    app.use('/', router);  
    router.use('/users', usersRouter);
    router.use('/login', loginRouter);
    router.use('/signup', signupRouter);
    router.use('/profile', profileRouter);
    router.use('/chat', chatRouter);
}

module.exports = routerApi