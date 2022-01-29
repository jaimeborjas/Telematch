const faker = require('faker');
const boom = require('@hapi/boom');

class UserService {
    constructor() {
        this.products = [];
        this.generate(100);
    }

    // Generates fake data to send in request via faker (NEEDS TO BE CHANGE ONCE WE FIGURE OUT THE DATABASE)
    generate(limit) {
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                type: "student",
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                image: faker.image.people(),
            });
            this.products.push({
                id: faker.datatype.uuid(),
                type: "preceptor",
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                image: faker.image.people()
            });
        }

    }
    // Create a new user [TO DO => how to create a user depending on the type]
    async create(data) {
        const { name, firstName, lastName, image } = data;
        const newProduct = {
            id: faker.datatype.uuid(),
            type: "student",
            firstName: firstName,
            lastName: lastName,
            image: image
        }
    }

    // Returns all users in the fake database once we figure it out the database we will do lookups in this function
    findAll() {
        return this.products;
    }

    // Returns an array of all the users who are students
    findStudents() {
        return this.products.filter(item => item.type == "student");
    }

    // Returns an array of all the users who are preceptors
    findPreceptors() {
        return this.products.filter(item => item.type == "preceptor");
    }

}

module.exports = UserService;