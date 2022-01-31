const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/profile.ejs');
})


module.exports = router;