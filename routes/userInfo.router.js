const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');


const userInfoService = require('../services/userInfo.service');
const  { createUserInfoSchema, getUserInfoSchema, updateUserInfoSchema } = require('../schemas/userInfo.schema');

const router = express.Router();
const service = userInfoService.getInstance();

router.get('/', async (req, res, next) => {
    try {
        const customer = await service.findAll();
        res.json(customer)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', validatorHandler(getUserInfoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id }  = req.params;
            const newCustomer = await service.findOne(id)
            res.json(newCustomer)
        } catch (error) {
            next(error)
        }
});

router.post('/',
    validatorHandler(createUserInfoSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCustomer = await service.create(body)
            res.status(201).json(newCustomer)
        } catch (error) {
            next(error)
        }
});

router.patch('/:id',
    validatorHandler(getUserInfoSchema, 'params'),
    validatorHandler(updateUserInfoSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const customer = await service.update(id, body);
            res.json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(updateUserInfoSchema, 'params'),
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
