const express = require('express');

const usersRouter = require('./users.router');
const userInfoRouter = require('./userInfo.router');
const authRouter = require('./auth.router');
const messagesRouter = require('./messages.router');

// Router that manages the '/api' endpoint
function routerApi(app) {
  const router = express.Router();
  app.use('/', router);
  router.use('/users', usersRouter);
  router.use('/userinfo', userInfoRouter);
  router.use('/auth', authRouter);
  router.use('/messages', messagesRouter);
}

module.exports = routerApi;
