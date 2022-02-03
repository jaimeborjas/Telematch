const Joi = require('joi');

const id = Joi.number();
const role = Joi.string().valid(...['student','preceptor']);
const email = Joi.string().email();
const password = Joi.string().min(8);
const passwordRepeat = Joi.string().min(8);

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role
})

const getUserSchema = Joi.object({
    id: id.required()
})

const updateUserSchema = Joi.object({
    email: email,
    password: password,
    role: role
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema }