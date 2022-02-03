const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const ejs = require('ejs')

const { errorHandler, logErrors, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

// Setting View Engine to EJS
app.set('view engine', 'ejs')
app.set("views", "views");

//express middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Serve static file in the public folder, this includes the css, client js, and images
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})
routerApi(app);

// middleware to handle errors
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log('Listening on port 3000'))