const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const ejs = require('ejs')


const app = express();
const port = process.env.PORT || 3000;

// Setting View Engine to EJS
app.set('view engine', 'ejs')
app.set("views", "views");

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
// Serve static file in the public folder, this includes the css, client js, and images
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})
routerApi(app);

app.listen(port, () => console.log('Listening on port 3000'))