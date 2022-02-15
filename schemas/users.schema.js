const Joi = require('joi');

const id = Joi.number();
const role = Joi.string().valid(...['student','preceptor']);
const email = Joi.string().email();
const password = Joi.string().min(8);

const firstName = Joi.string();
const lastName = Joi.string();
const location = Joi.string();

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role,
    customer: Joi.object({   
        firstName: firstName.required(),
        lastName: lastName.required(),
        location: location.required()
    })
})

const getUserSchema = Joi.object({
    id: id.required()
})

const updateUserSchema = Joi.object({
    email: email,
    password: password,
    role: role,
    customer: Joi.object({   
        firstName: firstName.required(),
        lastName: lastName.required(),
        location: location.required()
    })
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema }