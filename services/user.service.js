const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class UserService {
    static _userServiceInstance = null
    
    //Singleton of the user service. do not call constructor instead call getInstance method
    static getInstance() {
        if (UserService._userServiceInstance === null) {
            UserService._userServiceInstance = new UserService();
        }
        return UserService._userServiceInstance;
    }

    constructor() {
        this.users = [];
    }
    // Create a new user [TO DO => how to create a user depending on the type]
    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }
    // Takes an id and updates the object with the changes
    async update(id, changes) {
        const user = await this.findOne(id)
        const res = await user.update(changes);
        return res
    }
    // Deletes the object with the given id
    async delete(id) { 
        const user = await this.findOne(id)
        await user.destroy();
        return id;
    }
    async findOne(id) {
        const user = await models.User.findByPk(id);
        if(!user){ 
            throw boom.notFound('User not found')
        }
        return user
    }
    // Returns all users in the fake database once we figure it out the database we will do lookups in this function
    async findAll() {
        const res = await models.User.findAll();
        return res;
    }

    // Returns an array of all the users who are students
    findStudents() {
        return this.users.filter(item => item.type == "student");
    }

    // Returns an array of all the users who are preceptors
    findPreceptors() {
        return this.users.filter(item => item.type == "preceptor");
    }

}

module.exports = UserService;