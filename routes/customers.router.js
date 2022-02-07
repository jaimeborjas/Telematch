const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');


const CustomerService = require('../services/customer.service');
const  { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customers.schema');

const router = express.Router();
const service = CustomerService.getInstance();

router.get('/', async (req, res, next) => {
    try {
        const customer = await service.findAll();
        res.json(customer)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id }  = req.params;
            const newCustomer = await service.findOne(id)
            res.json(newCustomer)
        } catch (error) {
            next(error)
        }
});

router.post('/', validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCustomer = await service.create(body)
            res.json(newCustomer)
        } catch (error) {
            next(error)
        }
});

router.patch('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
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
    validatorHandler(getCustomerSchema, 'params'),
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