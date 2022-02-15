const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class CustomerService {
    static _customerServiceInstance = null
    
    //Singleton of the customer service. do not call constructor instead call getInstance method
    static getInstance() {
        if (CustomerService._customerServiceInstance === null) {
            CustomerService._customerServiceInstance = new CustomerService();
        }
        return CustomerService._customerServiceInstance;
    }

    constructor() {
        this.users = [];
    }
    // Create a new Customer
    async create(data) {
        const newCustomer = await models.Customer.create(data);
        delete newCustomer.dataValues.user.password
        return newCustomer;
    }
    // Takes an id and updates the object with the changes
    async update(id, changes) {
        const customer = await this.findOne(id)
        const res = await customer.update(changes);
        return res
    }
    // Deletes the object with the given id
    async delete(id) { 
        const customer = await this.findOne(id)
        await customer.destroy();
        return id;
    }
    async findOne(id) {
        const customer = await models.Customer.findByPk(id, {
            include: ['user']
        });
        if(!customer){ 
            throw boom.notFound('User not found')
        }
        return customer
    }
    // Returns all customer in the database
    async findAll() {
        const res = await models.Customer.findAll({
            include: ['user']
        });
        return res;
    }

}

module.exports = CustomerService;