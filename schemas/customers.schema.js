const Joi = require('joi');

const id = Joi.number();
const userId = Joi.number();
const firstName = Joi.string();
const lastName = Joi.string();
const location = Joi.string();

const createCustomerSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    userId: userId.required(),
    location: location.required()
})

const getCustomerSchema = Joi.object({
    id: id.required()
})

const updateCustomerSchema = Joi.object({
    firstName: firstName,
    lastName: lastName,
    location: location,
    userId: userId
});

module.exports = { createCustomerSchema, getCustomerSchema, updateCustomerSchema }