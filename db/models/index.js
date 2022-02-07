const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

/**
 *  Inits all of the DB Models into the sequelize instance
 * @param sequelize sequelize instance
 */

function setupModels(sequelize) {
    // inits models and schema
    User.init(UserSchema, User.config(sequelize)); // Inits 'users' table
    Customer.init(CustomerSchema, Customer.config(sequelize)); // Init 'customers' table
    
    // inits relations
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
}

module.exports = setupModels;