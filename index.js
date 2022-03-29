const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const httpServer = require('http').createServer(app);
const routerApi = require('./routes');
const cors = require('cors');

const { errorHandler, logErrors, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');
const { application_name } = require('pg/lib/defaults');

const options = {
  cors: {
    origin: '*',
  },
};

const io = require('socket.io')(httpServer, options);

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('message', 'connection');
  socket.on('notification', (notification) => {
    console.log(notification);
  });
});
io.on('disconnect', (socket) => {
  console.log('disoncee');
});
io.on('notification', (socket) => {
  console.log('disoncee');
});
//express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./utils/auth');

routerApi(app); // initialize the router

// middleware to handle errors
app.use(logErrors);
app.use(boomErrorHandler);
app.use(sequelizeErrorHandler);
app.use(errorHandler);

httpServer.listen(port, () => console.log('Listening on port 3000'));
