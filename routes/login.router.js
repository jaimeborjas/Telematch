const express = require('express');

const users = [
    {
        email: 'example@mail.com',
        password: '12345'
    }
]

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/login.ejs');
})

router.post('/', (req, res) => { 
    const body = JSON.parse(JSON.stringify(req.body));
    const user = {
        email: body.email,
        password: body.password
    }
    if (users.find( item => item.name == user.name && item.password == user.password)) res.redirect('/')
    else res.redirect('/signup')
})

module.exports = router;