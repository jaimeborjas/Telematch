const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/signup.ejs');
})

router.post('/', (req, res) => {
    const { data } = req.body;
    console.log(data)
})

module.exports = router;