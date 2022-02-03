const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');


const UserService = require('./../services/user.service');
const { createUserSchema, getUserSchema, updateUserSchema } = require('./../schemas/users.schema');

const router = express.Router();
const service = UserService.getInstance();

router.get('/', async (req, res) => {
    const users = await service.findAll();
    res.json(users)
})

router.get('/:id', validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id }  = req.params;
            const newUser = await service.findOne(id)
            res.json(newUser)
        } catch (error) {
            next(error)
        }
});

router.post('/', validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body)
            res.json(newUser)
        } catch (error) {
            next(error)
        }
});

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({id});
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/')

module.exports = router;
