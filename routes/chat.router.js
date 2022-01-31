const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/chat.ejs');
})


module.exports = router;