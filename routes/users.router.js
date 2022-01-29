const express = require('express');

const UserService = require('./../services/user.service');


const router = express.Router();
const service = new UserService()

router.get('/', (req, res) => {
    const users = service.findAll();
    res.json(users)
})

module.exports = router;
