const express = require('express');

const UserService = require('./../services/user.service');


const router = express.Router();
const service = new UserService()

router.get('/', (req, res) => {
    const users = service.findAll();
    res.json(users)
})

router.post('/', (req, res) => {
    const { data } = req.body;
    const user = service.create();
})

module.exports = router;
