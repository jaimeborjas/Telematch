const Joi = require('joi');

const id = Joi.number();
const role = Joi.string().valid(...['student', 'preceptor']);
<<<<<<< HEAD
=======
const username = Joi.string();
>>>>>>> d1773b99f15b714d42cf5b7af21f004f7f48396d
const email = Joi.string().email();
const password = Joi.string().min(8);

const firstName = Joi.string();
const lastName = Joi.string();
const location = Joi.string();
const availability = Joi.boolean();
const bio = Joi.string();
const specialty = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
  userInfo: Joi.object({
<<<<<<< HEAD
=======
    username: username.required(),
>>>>>>> d1773b99f15b714d42cf5b7af21f004f7f48396d
    firstName: firstName.required(),
    lastName: lastName.required(),
    location: location,
    availability: availability,
    bio: bio,
    specialty: specialty,
  }),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
  userInfo: Joi.object({
    firstName: firstName,
    lastName: lastName,
    location: location,
    availability: availability,
    bio: bio,
    specialty: specialty,
  }),
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema };
