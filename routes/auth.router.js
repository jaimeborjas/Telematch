const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('./../schemas/users.schema');
const UserService = require('./../services/user.service');


const service = UserService.getInstance();


const { config } = require('../config/config')

const router = express.Router();

router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/signup', 
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            next();
        } catch (error) {
            next(error)
        }
    }, passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;